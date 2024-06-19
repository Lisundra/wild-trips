'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Tour, {
        through: models.TourOptions,
        foreignKey: 'accommodation_id',
      });
    }
  }
  Accommodation.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Accommodation',
  });
  return Accommodation;
};