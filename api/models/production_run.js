'use strict';
module.exports = (sequelize, DataTypes) => {
  const Production_Run = sequelize.define('Production_Run', {
    daily_log_id: DataTypes.UUID,
    party_id: DataTypes.UUID,
    machine_id: DataTypes.UUID,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    preform_used_qty: DataTypes.INTEGER,
    produced_qty: DataTypes.INTEGER,
    damaged_qty: DataTypes.INTEGER,
    remarks: DataTypes.TEXT
  }, {
    tableName: 'production_run'
      , paranoid: true
  });
  Production_Run.associate = function(models) {
    Production_Run.belongsTo(models.DailyLog, { 
        foreignKey: 'daily_log_id',
        as:'prd_run_daily_log'
     });
    Production_Run.belongsTo(models.Party, { 
        foreignKey: 'party_id',
        as:'prd_run_party'
     });
     Production_Run.belongsTo(models.Machine, { 
        foreignKey: 'machine_id',
        as:'prd_run_machine'
     });
  };
  return Production_Run;
};
