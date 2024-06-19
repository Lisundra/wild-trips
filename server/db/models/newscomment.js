'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.NewsComment, {
        foreignKey: 'parent_comment_id',
      });
    }
  }
  NewsComment.init({
    comment: DataTypes.TEXT,
    likes_count: DataTypes.INTEGER,
    news_id: DataTypes.INTEGER,
    parent_comment_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'NewsComment',
  });
  return NewsComment;
};