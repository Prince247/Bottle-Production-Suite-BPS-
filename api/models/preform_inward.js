'use strict';
module.exports = (sequelize, DataTypes) => {
  const Perform_Inward = sequelize.define('Perform_Inward', {
    daily_log_id: DataTypes.UUID,
    party_id: DataTypes.UUID,
    box: DataTypes.DECIMAL(16,9),
    qty_per_box: DataTypes.DECIMAL(16,9),
    total_qty: DataTypes.DECIMAL(16,9),
    received_date: DataTypes.DATE
  }, {
    tableName: 'preform_inward'
      , paranoid: true
  });
  Perform_Inward.associate = function(models) {
    PreformInward.belongsTo(models.DailyLog, { 
        foreignKey: 'daily_log_id',
        as:'perf_daily_log'
     });
    PreformInward.belongsTo(models.Party, { 
        foreignKey: 'party_id',
        as:'perf_party'
     });
  };
  return Perform_Inward;
};
