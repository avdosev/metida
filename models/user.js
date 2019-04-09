'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {
      field: 'created_at',
      type:  DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type:  DataTypes.DATE,
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};



