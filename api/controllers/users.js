const jwt = require("jsonwebtoken");
const { sequelize } = require("../config/database_connection");
const db = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function createUser(data, txnCtx) {
    let existUser = await db.User.findOne({
        where: {
            email: data.name
        }
    })
    if (existUser) {
        return { status: 'error', message: 'User Already Exist' }
    }
    let hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    let userDataRes = await db.User.create(data, txnCtx);
    if (!userDataRes) {
        return ({ status: "error", message: "User Not Created Due to Incorrect Value!!!", data: [] })
    }
    return ({ status: "success", message: "User Created!!!", data: userDataRes })
}

async function getUser(data) {
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
        return ({ status: "error", message: "Please Check password!!! " })
    }
    let accessToken = jwt.sign({
        User: {
            name: userRes.name
        }
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    })
    return ({ status: "success", message: "User Created!!!", accessToken: accessToken })
}


module.exports = {
    async createUser(req, res) {
        if(!req.body){
            return res.json({status:'error',message:'Body Cannot be Empty'})
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
            return err
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
        return res.json(userRes);
    }

}
