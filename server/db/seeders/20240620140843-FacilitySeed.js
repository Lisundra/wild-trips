'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const acc = [
      'услуги гида',
      'входные билеты в музеи',
      'посещение термальных источников',
      'оформление пограничного пропуска',
      'экскурсии по программе',
      'питание по программе',
      'все трансферы по программе',
      'Проживание в местах размещения',
      'Медицинская страховка',
      'завтрак',
      'ужин',
      'обед',
      'оформление визы',
      'ж/д билеты',
      'посещение всех парков и резерваций',
      'авиабилеты',
      'алкогольные напитки',
      'индивидуальный трансфер',
      'двухместное размещение',
      'одноместное размещение',
    ];

    const facility = acc.map(name => ({
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Facilities', facility, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Facilities', null, {});
  }
};
