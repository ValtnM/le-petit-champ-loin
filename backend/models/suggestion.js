'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suggestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Suggestion.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'Users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Suggestion.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'Products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Suggestion.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Suggestion',
  });
  return Suggestion;
};