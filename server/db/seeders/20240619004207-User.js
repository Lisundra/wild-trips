/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        login: 'happy_traveler',
        email: 'ivan@gmail.com',
        password: '123',
        full_name: 'Иван Скворцов',
        role: 'traveler',
        profile_picture: null,
        bio: 'Люблю путешествовать и открывать для себя новые места. Увлекаюсь фотографией и горными лыжами.',
      },
      {
        login: 'adventure_seeker',
        email: 'anna@gmail.com',
        password: '123',
        full_name: 'Анна Максимова',
        role: 'traveler',
        profile_picture: null,
        bio: 'Стремлюсь побывать в самых удивительных уголках планеты. Обожаю активный отдых и экзотическую кухню.',
      },
      {
        login: 'world_wanderer',
        email: 'aleksandr@gmail.com',
        password: '123',
        full_name: 'Александр Щукин',
        role: 'organizer',
        profile_picture: null,
        bio: 'Опытный организатор путешествий с более чем 10-летним стажем. Провел десятки успешных туров по всему миру.',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};