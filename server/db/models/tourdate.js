'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TourDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tour, {
        foreignKey: 'tour_id',
      });
      this.belongsToMany(models.User, {
        through: models.Booking,
        foreignKey: 'tour_date_id',
      });
      this.belongsToMany(models.Tour, {
        through: models.Booking,
        foreignKey: 'tour_date_id',
      });
    }
  }
  TourDate.init({
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    tour_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'TourDate',
  });
  return TourDate;
};