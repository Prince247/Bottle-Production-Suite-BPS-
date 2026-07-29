'use strict';
module.exports = (sequelize, DataTypes) => {
  const Refresh_Token = sequelize.define('Refresh_Token', {
    user_id: DataTypes.UUID,
    token: DataTypes.TEXT,
    expires_at: DataTypes.DATE
  }, {
    tableName: 'refresh_token'
      , paranoid: true
  });
  Refresh_Token.associate = function (models) {
    Refresh_Token.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'ref_user'
    });
  };
  return Refresh_Token;
};
