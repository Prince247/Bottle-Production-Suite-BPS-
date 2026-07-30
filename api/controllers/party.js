const db = require('../models');
const { sequelize } = require('../config/database_connection');
const { Op } = require('sequelize');


async function listParties(req, res) {
    let partiesRes = await db.Party.findAll({
        where: {
            deletedAt: {
                [Op.is]: null
            }
        }
    })
    return { status: 'success', message: 'All Partiies', data: partiesRes }
}

async function createParties(reqData, txnCtx) {
    if (!reqData.party_name) {
        return { status: 'error', message: `Party Name is Mandatory` }
    }

    let partiesVal = await db.Party.findOne({
        where: {
            party_name: reqData.party_name
        },
        transaction: txnCtx
    });
    if (partiesVal) {
        return { status: 'error', message: `${partiesVal.party_name} is Already Exist` }
    }
    let parties = await db.Party.create(reqData, { transaction: txnCtx });
    if (!parties) {
        return { status: 'error', message: `Error in Craeting ${reqData.party_name}` }
    }
    return { status: 'success', message: 'All Partiies', data: parties }
}

module.exports = {
    async listParties(req, res) {
        let parties = await listParties(req, res);
        if (parties.status == 'error') {
            return res.json(parties)
        }
        return res.json(parties)
    },
    async createParties(req, res) {
        let reqData = req.body;
        if (!reqData) {
            return res.json({ status: 'error', message: 'Body Cannot be Empty' })
        }
        let txnCtx = await sequelize.transaction();
        let parties = await createParties(reqData, txnCtx);
        if (parties.status == 'error') {
            return res.json(parties)
        }
        return res.json(parties)
    }
}