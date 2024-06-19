/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TourDates', [
      {
        start_date: '2024-04-10',
        end_date: '2024-04-16',
        tour_id: 1,
      },
      {
        start_date: '2024-07-03',
        end_date: '2024-07-13',
        tour_id: 2,
      },
      {
        start_date: '2024-09-01',
        end_date: '2024-09-21',
        tour_id: 3,
      },
      {
        start_date: '2024-05-14',
        end_date: '2024-05-28',
        tour_id: 4,
      },
      {
        start_date: '2024-08-02',
        end_date: '2024-08-12',
        tour_id: 5,
      },
      {
        start_date: '2024-01-01',
        end_date: '2024-01-12',
        tour_id: 6,
      },
      {
        start_date: '2024-04-10',
        end_date: '2024-04-25',
        tour_id: 7,
      },
      {
        start_date: '2024-11-03',
        end_date: '2024-11-17',
        tour_id: 8,
      },
      {
        start_date: '2024-07-01',
        end_date: '2024-07-18',
        tour_id: 9,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TourDates', null, {});
  },
};