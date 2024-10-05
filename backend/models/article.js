'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'Users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    photo: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};