'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const activity = [
      "Пешие прогулки",
      "Треккинг",
      "Велопрогулки",
      "Поход в горы",
      "Джип-сафари",
      "Катание на квадроциклах",
      "Катание на снегоходах",
      "Катание на собачьих упряжках",
      "Лыжные походы",
      "Обзорные туры",
      "Конные прогулки",
      "Круизы",
      "Сплавы",
      "Яхтинг",
      "Каякинг",
      "Дайвинг",
      "Экспедиции",
      "Этнотуры",
      "Полет на вертолёте",
      "Парапланеризм"
    ];

    const activities = activity.map(name => ({
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Activities', activities, {});
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Activities', null, {});
    
  }
};
