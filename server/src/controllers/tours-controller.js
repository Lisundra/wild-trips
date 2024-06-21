const { User } = require('../../db/models');
const { Tour } = require('../../db/models');
const { Activity } = require('../../db/models');
const { Housing } = require('../../db/models');
const { Facility } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  getAllTours: async (req, res) => {
    try {
      const allTours = await Tour.findAll();
      const allToursPlain = allTours.map((tour) => tour.get({ plain: true }));
      res.json(allToursPlain);
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
            model: Activity,
          },
          {
            model: Housing,
          },
          {
            model: Facility,
          },
        ],
      });
      const oneTourPlain = oneTour.get({ plain: true });
      //console.log('------------------------', oneTourPlain);
      //console.log('++++++++++++++++++++++++', oneTourPlain.Facilities[0].TourOption.type);
      res.json(oneTourPlain);
    } catch (err) {
      res.status(400).json({ err: err.message });
      console.log('ошибка в ручке getOneTour', err);
    }
  },
  
  getDiscountedTours: async (req, res) => {
    try {
      const discountedTours = await Tour.findAll({
        where: {
          discount: {
            [Op.ne]: null
          }
        }
      });
      const discountedToursPlain = discountedTours.map((tour) => tour.get({ plain: true }));
      res.json(discountedToursPlain);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  getEditorsTours: async (req, res) => {
    try {
      const editorsTours = await Tour.findAll({
        where: {
          editors_choice: {
            [Op.eq]: true
          }
        }
      });
      const editorsToursPlain = editorsTours.map((tour) => tour.get({ plain: true }));
      res.json(editorsToursPlain);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  getNewTours: async (req, res) => {
    try {
      const newTours = await Tour.findAll({
        order: [['createdAt', 'DESC']],
        limit: 5,
      });
      const newToursPlain = newTours.map((tour) => tour.get({ plain: true }));
      res.json(newToursPlain);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  getAllOptions: async (req, res) => {
    try {
      const allOptions = {
        facility: (await Facility.findAll()).map(item => item.get({ plain: true })),
        activity: (await Activity.findAll()).map(item => item.get({ plain: true })),
        housing: (await Housing.findAll()).map(item => item.get({ plain: true })),
      }
      
      res.json(allOptions);
    } catch (err) {
      console.log("🚀 ~ getAllTours: ~ err:", err)
      
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
      housings, //! здесь нужен массив выбранных типов размещения в туре
      facilities, //! здесь нужен массив выбранных удобств
    } = req.body;

    const duration = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24));

    try {

      const createdTour = await Tour.create({ 
        title,
        subtitle,
        description,
        start_date,
        end_date,
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

      for (let activity_id of activities) {
        await TourOption.create({
          tour_id: createdTour.id,
          activity_id,
        });
      }

      for (let housing_id of housings) {
        await TourOption.create({
          tour_id: createdTour.id,
          housing_id,
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
