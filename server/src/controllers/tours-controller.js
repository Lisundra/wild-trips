const { User } = require('../../db/models');
const { Tour } = require('../../db/models');
const { TourDates } = require('../../db/models');
const { TourOptions } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  getAllTours: async (req, res) => {
    try {
      const allTours = await Tour.findAll({
        include: [
          {
            model: TourDates,
          },
          {
            model: TourOptions,
          }
        ]
      });
      res.json(allTours);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  getDiscountedTours: async (req, res) => {
    try {
      const discountedTours = await Tour.findAll({
        where: {
          discount: {
            [Op.ne]: null
          }
        },
        include: [
          {
            model: TourDates,
          },
          {
            model: TourOptions,
          }
        ]
      });
      res.json(discountedTours);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  getEditorsTours: async (req, res) => {
    try {
      const tours = await Tour.findAll({
        where: {
          editors_choice: {
            [Op.eq]: true
          }
        },
        include: [
          {
            model: TourDates,
          },
          {
            model: TourOptions,
          }
        ]
      });
      res.json(tours);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  getNewTours: async (req, res) => {
    try {
      const tours = await Tour.findAll({
        
      });
      res.json(tours);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  getOneTour: async (req, res) => {
    try {
      const tour = await Tour.findAll();
      res.json(tour);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },








  // createTour: async (req, res) => {
  //   const { title, text } = req.body;
  //   try {
  //     const tour = await Tour.create({ title, text });
  //     res.json(tour);
  //   } catch (err) {
  //     res.status(400).json({ err: err.message });
  //   }
  // },

  // deleteTour: async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     const result = await Tour.destroy({ where: { id } });

  //     if (result) {
  //       res.sendStatus(200);
  //     } else {
  //       res.sendStatus(400);
  //     }
  //   } catch (err) {
  //     res.status(400).json({ err: err.message });
  //   }
  // },
};
