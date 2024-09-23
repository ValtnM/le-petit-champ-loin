'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Article, {
        foreignKey: 'user_id',
        as: 'Articles',
      });
      User.belongsToMany(models.Event, {
        through: "Event_Users", // Table de liaison
        foreignKey: "user_id",
        as: 'EventUsers',
      });      
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    presentation: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};