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
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'Users',
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
      });
      Product.hasMany(models.ProductPhoto, {
        foreignKey: 'product_id',
        as: 'Product_Photos',
        onDelete: 'CASCADE',
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    photo: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};