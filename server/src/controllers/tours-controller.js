const { User } = require('../../db/models');
const { Tour } = require('../../db/models');
const { TourDates } = require('../../db/models');
const { TourOptions } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  getAllTours: async (req, res) => {
    try {
      console.log('Попали сюда');
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

  getOneTour: async (req, res) => {
    const { id } = req.params;
    try {
      const oneTour = await Tour.findOne({ 
        where: { id }, 
        include: [
        {
          model: TourDates,
        },
        {
          model: TourOptions,
        }
      ]});
      res.json(oneTour);
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
      const newTours = await Tour.findAll({
        order: [['createdAt', 'DESC']],
        limit: 5,
        include: [
          {
            model: TourDates,
          },
          {
            model: TourOptions,
          }
        ]
      });
      res.json(newTours);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  createTour: async (req, res) => {
    const { login } = req.session;
    const user = await User.findOne({ where: { login } });
    const { 
      title, 
      subtitle,
      start_date,
      end_date,
      description,
      price,
      discount,
      country,
      region,
      season,
      difficulty,
      family_friendly,
      activities, //! здесь нужен массив выбранных активностей
      accommodations, //! здесь нужен массив выбранных типов размещения в туре
      facilities, //! здесь нужен массив выбранных удобств
    } = req.body;

    const duration = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24));

    try {

      const createdTour = await Tour.create({ 
        title,
        subtitle,
        description,
        duration,
        price,
        discount,
        country,
        region,
        season,
        difficulty,
        family_friendly,
        organizer_id: user.id,
      });

      await TourDates.create({
        tour_id: createdTour.id,
        start_date,
        end_date,
      });

      for (let activity_id of activities) {
        await TourOption.create({
          tour_id: createdTour.id,
          activity_id,
        });
      }

      for (let accommodation_id of accommodations) {
        await TourOption.create({
          tour_id: createdTour.id,
          accommodation_id,
        });
      }

      for (let facility_id of facilities) {
        await TourOption.create({
          tour_id: createdTour.id,
          facility_id,
        });
      }
      
      res.json({ status: 'success', createdTour });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

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
