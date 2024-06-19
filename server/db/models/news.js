'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'author_id',
      });
      this.hasMany(models.NewsComment, {
        foreignKey: 'news_id',
      });
      this.belongsToMany(models.News, {
        through: models.NewsTags,
        foreignKey: 'news_id',
      });
      this.hasOne(models.Image, {
        foreignKey: 'news_id',
      });
    }
  }
  News.init({
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    author_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};