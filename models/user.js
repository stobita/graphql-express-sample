'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    password: {
      type: DataTypes.STRING,
      field: 'password'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
