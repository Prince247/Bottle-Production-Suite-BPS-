'use strict';
module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('Party', {
    party_name: DataTypes.STRING,
    payment: DataTypes.decimal(16, 9)
  }, {
    tableName: 'parties'
    , paranoid: true
  });
  Party.associate = function (models) {
    Party.hasMany(models.ProductionRun, {
      foreignKey: 'id',
      as: 'part_prd_run'
    });
    Party.hasMany(models.PackingEntry, {
      foreignKey: 'id',
      as: 'part_pack_ent'
    });
    Party.hasMany(models.Despatch, {
      foreignKey: 'id',
      as: 'part_desp'
    });
    Party.hasMany(models.PreformInward, {
      foreignKey: 'id',
      as: 'part_perform'
    });
  };
  return Party;
};
