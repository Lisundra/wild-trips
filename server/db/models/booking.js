'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    people_count: DataTypes.INTEGER,
    tour_date_id: DataTypes.INTEGER,
    tour_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};