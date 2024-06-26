"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const funcSeedNameImage =(name)=>{
      const obj = 
        [
          `/src/assets/images/${name}1.jpg`,
          `/src/assets/images/${name}2.jpg`,
          `/src/assets/images/${name}3.jpg`,
          `/src/assets/images/${name}4.jpg`,
          `/src/assets/images/${name}5.jpg`,
        ]
      
      return JSON.stringify(JSON.stringify(obj));
    }

    await queryInterface.bulkInsert("Images", [
      {
        image_path: funcSeedNameImage('kam'),
        tour_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image_path: funcSeedNameImage('tanz'),
        tour_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image_path: funcSeedNameImage('gim'),
        tour_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image_path: funcSeedNameImage('ken'),
        tour_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image_path: funcSeedNameImage('pat'),
        tour_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image_path: funcSeedNameImage('kost'),
        tour_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image_path: funcSeedNameImage('sev'),
        tour_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image_path: funcSeedNameImage('ind'),
        tour_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image_path: funcSeedNameImage('zel'),
        tour_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Добавьте больше данных по необходимости
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
