"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductPhoto extends Model {
    static associate(models) {
      ProductPhoto.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }
  ProductPhoto.init(
    {
      name: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductPhoto",
      tableName: "product_photos",
    }
  );
  return ProductPhoto;
};
