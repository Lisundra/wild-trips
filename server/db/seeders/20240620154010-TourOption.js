'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TourOptions', [
      {
        tour_id:1,
        activity_id: 7,
        housing_id: 3,
        facility_id: 1,
        type: true,
      },
      {
        tour_id:1,
        activity_id: 9,
        housing_id: 7,
        facility_id: 5,
        type: false,
      },
      {
        tour_id:2,
        activity_id: 1,
        housing_id: 1,
        facility_id: 1,
        type: true,
      },
      {
        tour_id:2,
        activity_id: 3,
        housing_id: 7,
        facility_id: 8,
        type: false,
      },
      {
        tour_id:2,
        activity_id: 2,
        housing_id: 8,
        facility_id:2,
        type: false,
      },
      {
        tour_id:5,
        activity_id: 1,
        housing_id: 1,
        facility_id:1,
        type: false,
      }, {
        tour_id:5,
        activity_id: 2,
        housing_id: 3,
        facility_id: 7,
        type: false,
      }, {
        tour_id:5,
        activity_id: 13,
        facility_id: 9,
        type: true,
      }, {
        tour_id:5,
        activity_id: 4,
        housing_id: 9,
        facility_id: 20,
        type: true,
      },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    

      await queryInterface.bulkDelete('TourOptions', null, {});
     
  }
};
