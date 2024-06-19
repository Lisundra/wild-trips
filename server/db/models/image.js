'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tour, {
        foreignKey: 'tour_id',
      });
      this.belongsTo(models.News, {
        foreignKey: 'news_id',
      });
    }
  }
  Image.init({
    image_path: DataTypes.JSONB,
    tour_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};