'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Tour, {
        foreignKey: 'organizer_id',
      });
      this.belongsToMany(models.Tour, {
        through: models.Booking,
        foreignKey: 'user_id',
      });
      this.belongsToMany(models.Tour, {
        through: models.Review,
        foreignKey: 'user_id',
      });
      this.hasMany(models.Message, {
        foreignKey: 'sender_id',
      });
      this.hasMany(models.Message, {
        foreignKey: 'receiver_id',
      });
      this.hasMany(models.News, {
        foreignKey: 'author_id',
      });
      this.hasMany(models.NewsComment, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init({
    login: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    full_name: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'traveler', 'organizer'),
    profile_picture: DataTypes.STRING,
    bio: DataTypes.TEXT,
    email_subscription: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};