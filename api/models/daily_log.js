'use strict';
module.exports = (sequelize, DataTypes) => {
  const Daily_log = sequelize.define('Daily_log', {
    date: DataTypes.DATE
  }, {
    tableName: 'daily_logs'
      , paranoid: true
  });
  Daily_log.associate = function(models) {
    Daily_log.hasMany(models.Perform_Inward, { 
        foreignKey: 'id',
        as:'daily_perf' 
    });
    Daily_log.hasMany(models.Production_Run, { 
        foreignKey: 'id',
        as:'daily_prd_run'
     });
    Daily_log.hasMany(models.Packing_Entry, { 
        foreignKey: 'id',
        as:'daily_pack_ent'
     });
    Daily_log.hasMany(models.Despatch, { 
        foreignKey: 'id',
        as:'daily_despatch'
     });
  };
  return Daily_log;
};
