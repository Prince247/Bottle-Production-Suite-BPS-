const jwt = require("jsonwebtoken");
const { sequelize } = require("../config/database_connection");
const db = require("../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();

// Rule: Use try/catch around operations that can fail.
async function createUser(data, txnCtx) {
    try {
        let existUser = await db.User.findOne({
            where: {
                name: data.name
            }
        })
        if (existUser) {
            return { status: 'error', message: 'User Already Exist' }
        }
        let hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        let userDataRes = await db.User.create(data, {
            transaction: txnCtx
        });
        if (!userDataRes) {
            return { status: "error", message: "User Not Created Due to Incorrect Value!!!", data: [] }
        }
        return { status: "success", message: "User Created!!!", data: userDataRes }
    }
    catch (err) {
        console.log(err)
        return { status: "error", message: "CATCH_ERROR", error_message: err }
    }
}

async function getUser(data) {
    try {
        let userRes = await db.User.findOne({
            where: {
                name: data.name
            }
        })
        if (!userRes) {
            return { status: 'error', message: `User Does not Exist!!!` }
        }
        let comparePassword = await bcrypt.compare(data.password, userRes.password);
        if (!comparePassword) {
            return { status: "error", message: "Please Check password!!! " }
        }
        let accessToken = jwt.sign({
            User: {
                user_id: userRes.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRE
        })
        let refreshToken = generateRefreshToken();
        await db.RefreshToken.create({
            user_id: userRes.id,
            token: refreshToken,
            expires_at: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            )
        });
        return ({ status: "success", message: "User Created!!!", accessToken: accessToken, refreshToken: refreshToken })
    }
    catch (err) {
        console.log(err)
        return { status: "error", message: "CATCH_ERROR", error_message: err }
    }

}

function generateRefreshToken() {
    return crypto.randomBytes(64).toString("hex");
}

async function refreshJwtToken(refreshToken) {
    try {
        let tokenData = await db.RefreshToken.findOne({
            where: {
                token: refreshToken
            }
        });
        if (!tokenData) {
            return { status: 'error', message: `Invalid Refresh Token!!!` }
        }
        if (new Date() > tokenData.expires_at) {

            await tokenData.destroy();
            return { status: "error", message: "Refresh Token Expired" };
        }

        let userRes = await db.User.findOne({
            where: {
                id: tokenData.user_id
            }
        });
        let accessToken = jwt.sign(
            {
                user_id: userRes.id,
                name: userRes.name
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.JWT_ACCESS_EXPIRE
            }
        );
        return { status: "success", accessToken: accessToken }
    }
    catch (err) {
        console.log(err)
        return { status: "error", message: "CATCH_ERROR", error_message: err }
    }
}


module.exports = {
    async createUser(req, res) {
        if (!req.body) {
            return res.json({ status: 'error', message: 'Body Cannot be Empty' })
        }
        let data = req.body;
        let txnCtx = await sequelize.transaction();
        try {
            if (!data.name || !data.password) {
                return res.json({ status: "error", message: "All field are Mandatory!!! " })
            }
            let userRes = await createUser(data, txnCtx);
            if (userRes.status == 'error') {
                await txnCtx.rollback();
                return res.json(userRes)
            }
            await txnCtx.commit();
            return res.json(userRes);
        }
        catch (err) {
            console.log(err);
            return res.json({ status: "error", message: "CATCH_ERROR", error_message: err })
        }
    },
    async getUser(req, res) {
        let data = req.body;
        if (!req.body) {
            return res.json({ status: 'error', message: 'Body Cannot be Empty' })
        }
        let userRes = await getUser(data);
        if (userRes.status == 'error') {
            return res.json(userRes)
        }
        res.cookie("refreshToken", userRes.refreshToken, {
            httpOnly: true,
            secure: true, // true in production to send to browser store in cookies
            sameSite: "strict"
        });
        return res.json(userRes);
    },
    async refreshJwtToken(req, res) {
        let refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.json({ status: 'error', message: 'Refresh Token Required' })
        }
        let userRes = await refreshJwtToken(refreshToken);
        if (userRes.status == 'error') {
            return res.json(userRes)
        }
        return res.json(userRes);
    }
}
