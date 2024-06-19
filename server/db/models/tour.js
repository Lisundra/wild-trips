'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'organizer_id',
      });
      this.hasMany(models.Image, {
        foreignKey: 'tour_id',
      });
      this.hasMany(models.TourDate, {
        foreignKey: 'tour_id',
      });
      this.belongsToMany(models.Activity, {
        through: models.TourOptions,
        foreignKey: 'tour_id',
      });
      this.belongsToMany(models.Accommodation, {
        through: models.TourOptions,
        foreignKey: 'tour_id',
      });
      this.belongsToMany(models.Facility, {
        through: models.TourOptions,
        foreignKey: 'tour_id',
      });
      this.belongsToMany(models.User, {
        through: models.Bookings,
        foreignKey: 'tour_id',
      });
      this.belongsToMany(models.TourDate, {
        through: models.Bookings,
        foreignKey: 'tour_id',
      });
      this.belongsToMany(models.User, {
        through: models.Reviews,
        foreignKey: 'tour_id',
      });
    }
  }
  Tour.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    average_rating: DataTypes.REAL,
    editors_choice: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    season: DataTypes.ENUM('весна', 'лето', 'осень', 'зима'),
    difficulty: DataTypes.ENUM('низкая', 'средняя', 'высокая'),
    family_friendly: DataTypes.BOOLEAN,
    coordinates: DataTypes.JSON,
    organizer_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};