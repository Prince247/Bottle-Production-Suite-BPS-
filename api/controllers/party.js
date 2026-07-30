const db = require('../models');
const { sequelize } = require('../config/database_connection');
const { Op } = require('sequelize');
const commonUtils = require('../utils/commonUtils')


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

async function getPartiesById(partyId,txnCtx) {
    let partiesRes = await db.Party.findOne({
        where: {
            id:partyId
        },
        transaction:txnCtx
    })
    if(!partiesRes){
        return {status:'error',message:'Party Not Found!!'}
    }
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

async function updateParties(partyId, reqData, txnCtx){
    let partiesObj = await db.Party.findOne({
        where:{
            id:partyId
        }
    })
    if(!partiesObj){
        return {status:'error',message:'Party Not Found!!!'}
    }
    let dirtyFlag = false;
    if(partiesObj.party_name != reqData.party_name){
        dirtyFlag=true
    }
    let dataObj = await commonUtils.checkDirtyFlagForUpdate(reqData, partiesObj);
    if (dataObj.status == 'error') {
        return dataObj;
    }
    if (dirtyFlag) {
        await partiesObj.save({transaction:txnCtx})
    }else{
        console.log('Nothing to update...')
    }
    return {status:'success',message:'Updated Parties',data:partiesObj}
}

module.exports = {
    async listParties(req, res) {
        let parties = await listParties(req, res);
        if (parties.status == 'error') {
            return res.json(parties)
        }
        return res.json(parties)
    },
    async getPartiesById(req, res) {
        let partyId = req.params.id;
        if(!partyId){
            return {status:'error',message:'Party Id Missing!!'}
        }
        let txnCtx = await sequelize.transaction()
        let parties = await getPartiesById(partyId, txnCtx);
        if (parties.status == 'error') {
            await txnCtx.rollback();
            return res.json(parties)
        }
        await txnCtx.commit();
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
            await txnCtx.rollback()
            return res.json(parties)
        }
        await txnCtx.commit();
        return res.json(parties)

    },
    async updateParties(req, res) {
        let reqData = req.body;
        if (!reqData) {
            return res.json({ status: 'error', message: 'Body Cannot be Empty' })
        }
        let txnCtx = await sequelize.transaction();
        let partyId = req.params.id;
        if(!partyId){
            return {status:'error',message:'Party Id Missing!!'}
        }
        let parties = await updateParties(partyId, reqData, txnCtx);
        if (parties.status == 'error') {
            await txnCtx.rollback();
            return res.json(parties)
        }
        await txnCtx.commit();
        return res.json(parties)
    },
    async deleteParties(req,res){
        let txnCtx = await sequelize.transaction();
        let partyId = req.params.id;
        let valRes = await commonUtils.vallidateId({ id: partyId }, 'id', 'Party', 'Party', txnCtx);
        if (valRes.status == 'error') {
            await txnCtx.rollback();
            return res.json({ status: 'error', message: 'Id is Invalid!!' });
        }
        let delRes = await commonUtils.deleteData(partyId, 'Party', 'Party', txnCtx);
        if (delRes.status == 'error') {
            await txnCtx.rollback();
            return res.json({status:'error',message:'Error in delete'});
        }
        await txnCtx.commit();
        return res.json({status:'error',message:'Deleted Success!!'})
    }
}