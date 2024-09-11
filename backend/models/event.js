'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'Users',
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
      });
      Event.belongsToMany(models.User, {
        through: 'Event_Users',
        foreignKey: 'event_id',
        as: 'Users',
      });
    }
  }
  Event.init({
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    schedule: DataTypes.STRING,
    location: DataTypes.STRING,
    isVisible: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};