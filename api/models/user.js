'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    tableName: 'users'
      , paranoid: true
  });
  User.associate = function(models) {
  };
  return User;
};
