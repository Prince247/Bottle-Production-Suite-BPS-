'use strict';
module.exports = (sequelize, DataTypes) => {
  const Packing_Entry = sequelize.define('Packing_Entry', {
    daily_log_id: DataTypes.UUID,
    party_id: DataTypes.UUID,
    packets_count: DataTypes.INTEGER,
    bottles_per_packet: DataTypes.INTEGER,
    total_packed_qty: DataTypes.INTEGER,
    packed_time: DataTypes.DATE
  }, {
    tableName: 'packing_entries'
      , paranoid: true
  });
  Packing_Entry.associate = function(models) {
    Packing_Entry.belongsTo(models.DailyLog, { 
        foreignKey: 'daily_log_id',
        as:'pack_ent_daily_log'
     });
    Packing_Entry.belongsTo(models.Party, { 
        foreignKey: 'party_id',
        as:'pack_ent_party'
     });
  };
  return Packing_Entry;
};
