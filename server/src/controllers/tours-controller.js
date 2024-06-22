const { User } = require('../../db/models');
const { Tour } = require('../../db/models');
const { Activity } = require('../../db/models');
const { Housing } = require('../../db/models');
const { Facility } = require('../../db/models');
const { Image } = require('../../db/models');
const { TourOption } = require('../../db/models');
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
    
    let user = await User.findOne({ where: { login } });
    if(!user){
      user={id:1}
    }
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
      facilitiesFree,
      facilitiesPaid,
      activities,
      housings
  } = req.body;
  const images = req.files.map(file => file.path);
  const duration = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24));
//   const testData = {
//     title, 
//     subtitle,
//     start_date,
//     end_date,
//     description,
//     price,
//     discount,
//     country,
//     region,
//     season,
//     difficulty,
//     family_friendly,
//     facilitiesFree,
//     facilitiesPaid,
//     activities,
//     housings,
//     duration,
//     images
//   }
//  console.log(testData);

    try {
      const createdTour = await Tour.create({ 
        name:title,
        title,
        subtitle,
        description,
        start_date:new Date(start_date),
        end_date:new Date(end_date),
        duration,
        price:Number(price),
        discount:Number(discount),
        country,
        region,
        season,
        difficulty,
        family_friendly:family_friendly.toLowerCase() === 'false' ? false : true,
        organizer_id: user.id,
      });
      // console.log(createdTour);
      const jsonImages = JSON.stringify(images);

  Image.create({image_path:jsonImages,tour_id:createdTour.id})
      
const activityIds = JSON.parse(activities);
const housingIds = JSON.parse(housings);
const facilitiesFreeIds = JSON.parse(facilitiesFree);
const facilitiesPaidIds = JSON.parse(facilitiesPaid);

for (let activity_id of Object.keys(activityIds)) {
  console.log("🚀 ~ createTour: ~ activity_id:", Object.keys(activityIds))
  
  await TourOption.create({
    tour_id: createdTour.id,
    activity_id: parseInt(activity_id),
  });
}

for (let housing_id of Object.keys(housingIds)) {
  await TourOption.create({
    tour_id: createdTour.id,
    housing_id: parseInt(housing_id),
  });
}

for (let facility_id of Object.keys(facilitiesFreeIds)) {
  await TourOption.create({
    tour_id: createdTour.id,
    facility_id: parseInt(facility_id),
    type: false
  });
}

for (let facility_id of Object.keys(facilitiesPaidIds)) {
  await TourOption.create({
    tour_id: createdTour.id,
    facility_id: parseInt(facility_id),
    type: true
  });
}
     res.status(200).json({ status: 'success'});
    } catch (err) {
      console.log("🚀 ~ createTour: ~ err:", err)
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
      