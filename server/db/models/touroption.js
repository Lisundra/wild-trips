'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TourOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TourOption.init({
    tour_id: DataTypes.INTEGER,
    activity_id: DataTypes.INTEGER,
    accommodation_id: DataTypes.INTEGER,
    facility_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'TourOption',
  });
  return TourOption;
};