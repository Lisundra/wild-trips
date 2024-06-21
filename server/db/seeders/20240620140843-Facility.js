'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const facility = [
      'Услуги гида',
      'Посещение термальных источников',
      'Билеты в музеи',
      'Экскурсии по программе тура',
      'Проживание в местах размещения',
      'Медицинская страховка',
      'Завтраки',
      'Трёхразовое питание',
      'Алкогольные напитки',
      'Оформление всех документов',
      'Помощь в оформлении визы',
      'Билеты в парки, резервации и заповедники',
      'Все трансферы внутри тура',
      'Индивидуальные трансферы',
      'Ж/Д билеты до точки старта тура',
      'Авиабилеты до точки старта тура',
      'Перевоз багажа',
      'Одноместное размещение',
      'Двухместное размещение',
      'Палатка класса "Люкс"'
    ];

    const facilities = facility.map(name => ({
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Facilities', facilities, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Facilities', null, {});
  }
};
