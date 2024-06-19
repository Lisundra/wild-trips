'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subtitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      average_rating: {
        type: Sequelize.REAL,
        allowNull: true,
        defaultValue: 0.0,
      },
      editors_choice: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      region: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      season: {
        type: Sequelize.ENUM('весна', 'лето', 'осень', 'зима'),
        allowNull: false,
      },
      difficulty: {
        type: Sequelize.ENUM('низкая', 'средняя', 'высокая'),
        allowNull: false,
      },
      family_friendly: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      coordinates: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      organizer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tours');
  }
};