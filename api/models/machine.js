'use strict';
module.exports = (sequelize, DataTypes) => {
  const Machine = sequelize.define('Machine', {
    machine_no: DataTypes.INTEGER,
    operator_name: DataTypes.STRING
  }, {
    tableName: 'machine'
      , paranoid: true
  });
  Machine.associate = function(models) {
    Machine.hasMany(models.ProductionRun, { 
        foreignKey: 'id',
        as:'mach_prd_run'
    });
  };
  return Machine;
};
