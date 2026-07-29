'use strict';
module.exports = (sequelize, DataTypes) => {
  const Despatch = sequelize.define('Despatch', {
    daily_log_id: DataTypes.UUID,
    party_id: DataTypes.UUID,
    packets_despatched: DataTypes.INTEGER,
    bottles_per_packet: DataTypes.INTEGER,
    total_qty: DataTypes.INTEGER,
    despatch_time: DataTypes.DATE
  }, {
    tableName: 'despatch'
      , paranoid: true
  });
  Despatch.associate = function(models) {
    Despatch.belongsTo(models.Daily_log, { 
        foreignKey: 'daily_log_id',
        as:'despatch_daily_log'
     });
    Despatch.belongsTo(models.Party, { 
        foreignKey: 'party_id',
        as:'despatch_party'
     });
  };
  return Despatch;
};
