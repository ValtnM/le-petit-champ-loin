'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.ProductPhoto, {
        foreignKey: 'product_id',
        as: 'Product_Photos',
        onDelete: 'CASCADE',
      });
      Product.hasMany(models.Suggestion, {
        foreignKey: 'product_id',
        as: 'Suggestions',
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};