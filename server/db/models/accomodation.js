'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Housing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Tour, {
        through: models.TourOption,
        foreignKey: 'housing_id',
      });
    }
  }
  Housing.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Housing',
  });
  return Housing;
};