'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const housing = [
        'Отель',
        'Плавучий отель',
        'Гостевой дом',
        'Бунгало',
        'Юрта',
        'Хижина',
        'Ферма',
        'Глэмпинг',
        'Кемпинг',
        'Турбаза',
      ];
  
      const housings = housing.map(name => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
  
      await queryInterface.bulkInsert('Housings', housings, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Housings', null, {});
  }
};
