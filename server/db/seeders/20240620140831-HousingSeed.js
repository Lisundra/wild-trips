'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const acc = [
        'Отель',
        'Бизнес-отель',
        'Апартаменты',
        'Горнолыжный отель',
        'Мини-отель',
        'Кемпинг',
        'Флотель',
        'Капсульный отель',
        'Турбаза',
        'Гостевой дом'
      ];
  
      const housing = acc.map(name => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
  
      await queryInterface.bulkInsert('Housings', housing, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Housings', null, {});
  }
};
