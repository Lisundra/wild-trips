'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          title: 'post 1',
          text: 'text post 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'post 2',
          text: 'text post 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
