const { Op } = require('sequelize');
const db = require('../models');

async function checkDirtyFlagForUpdate(data, dataValues) {
  let dirty = false;
  let exlcudeKeysArr = ['id'];
  try {
    let objKeysArr=Object.keys(data);
    objKeysArr.map(e=>{
      if(!exlcudeKeysArr.find(e1=>e1==e)&&dataValues[e]!=data[e]) {
        console.log(`changing attribute ${e} old value: ${dataValues[e]}, new value: ${data[e]}`);
        dirty=true;
        dataValues[e] = data[e];
      }
    });
    return await ([], {dirty: dirty, dataValues: dataValues});
  } catch (err) {
    console.log('error in get owner WC fn, error: ', err);
    return ([{ status:'error', messageValue: 'CATCH_ERROR', replacements: { component: 'check dirty flag fn', error_message: err } }], err);
  }
}

async function deleteData(id, componentName, modelName, txnCtx){
  try {
    let count = await db[modelName].destroy({
      where: { id : id } 
      , transaction: txnCtx
      , individualHooks: true
    });
    if (count == 1) {
      return ([{ status:'error', messageValue: 'DELETE_COMPONENT_SUCCESS', replacements: {component: componentName}}], null);
    } else {
      return ([{ status:'error', messageValue: 'DELETE_COMPONENT_ERROR', replacements: {component: componentName}}], null);
    }
  } catch (err) {
    console.log('error in delete data, error: ', err.message);
    return ([{ status:'error', messageValue: 'CATCH_ERROR', replacements: { component: 'Delete Data fn', error_message: err } }], err);
  }
}

async function vallidateId(dataObj, keyName, componentName, modelName, txnCtx = null){
  let valId = await db[modelName].findOne({
    where: {
      id: dataObj[keyName]
    }
    , transaction: txnCtx
  });
  if (!valId) {
    let errObj = { fieldName: keyName };
    return ([{ status: "error", messageValue: 'INVALID_FIELD', replacements: { component: componentName, field_name: keyName } }], errObj);
  }
  return ({ status: 'success', valId });
}

module.exports = {
    async checkDirtyFlagForUpdate(data, dataValues) {
        return await checkDirtyFlagForUpdate(data, dataValues);
    },
    async deleteData(id, componentName, modelName, txnCtx){
      return await deleteData(id, componentName, modelName, txnCtx)
    },
    async vallidateId(dataObj, keyName, componentName, modelName, txnCtx){
      return vallidateId(dataObj, keyName, componentName, modelName, txnCtx)
    }
}