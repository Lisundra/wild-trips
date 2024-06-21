'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const act = [
      "Велопоездки",
      "Восхождения",
      "Джип-поездка",
      "Конные прогулки",
      "Круизы",
      "Лыжные походы",
      "Обзорные экскурсии",
      "Сплавы по рекам",
      "Треккинг",
      "Квадроциклетные поездки",
      "Снегоходные поездки",
      "Поездки на собачьих упряжках",
      "Экспедиции",
      "Этнографические путешествия",
      "Яхтинг",
      "Пешеходные прогулки",
      "Водные путешествия",
      "Приключения на вертолетах",
      "Каякинг",
      "Парапланеризм"
    ];

    const activities = act.map(name => ({
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
