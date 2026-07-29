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
    User.hasMany(models.Refresh_Token, { 
        foreignKey: 'id',
        as:'user_ref_tok'
    });
  };
  return User;
};
