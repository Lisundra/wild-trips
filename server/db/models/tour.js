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
      this.belongsToMany(models.Activity, {
        through: models.TourOption,
        foreignKey: 'tour_id',
      });
      this.belongsToMany(models.Housing, {
        through: models.TourOption,
        foreignKey: 'tour_id',
      });
      this.belongsToMany(models.Facility, {
        through: models.TourOption,
        foreignKey: 'tour_id',
      });
      this.belongsToMany(models.User, {
        through: models.Booking,
        foreignKey: 'tour_id',
      });
      this.belongsToMany(models.User, {
        through: models.Review,
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
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    season: DataTypes.ENUM('Весна', 'Лето', 'Осень', 'Зима'),
    difficulty: DataTypes.ENUM('Низкая', 'Средняя', 'Высокая'),
    family_friendly: DataTypes.BOOLEAN,
    coordinates: DataTypes.JSON,
    organizer_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};