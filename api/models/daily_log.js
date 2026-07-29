'use strict';
module.exports = (sequelize, DataTypes) => {
  const Daily_log = sequelize.define('Daily_log', {
    date: DataTypes.DATE
  }, {
    tableName: 'daily_logs'
      , paranoid: true
  });
  Daily_log.associate = function(models) {
    DailyLog.hasMany(models.PreformInward, { 
        foreignKey: 'id',
        as:'daily_perf' 
    });
    DailyLog.hasMany(models.ProductionRun, { 
        foreignKey: 'id',
        as:'daily_prd_run'
     });
    DailyLog.hasMany(models.PackingEntry, { 
        foreignKey: 'id',
        as:'daily_pack_ent'
     });
    DailyLog.hasMany(models.Despatch, { 
        foreignKey: 'id',
        as:'daily_despatch'
     });
  };
  return Daily_log;
};
