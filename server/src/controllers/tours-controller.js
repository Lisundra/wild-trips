const { User } = require('../../db/models');
const { Tour } = require('../../db/models');
const { Activity } = require('../../db/models');
const { Housing } = require('../../db/models');
const { Facility } = require('../../db/models');
const { Image } = require('../../db/models');
const { TourOption } = require('../../db/models');
const { Review } = require('../../db/models');
const { Op, where } = require('sequelize');

module.exports = {
  getAllTours: async (req, res) => {
    try {
      const allTours = await Tour.findAll({
        include: [
          {
            model: Image,
          },
          {
            model: Activity,
          },
          {
            model: Housing,
          },
        ],
      });
      const allToursPlain = allTours.map((tour) => tour.get({ plain: true }));
      res.json(allToursPlain);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },
  getAllToursByUser: async (req, res) => {
    try {
      const { login } = req.session;
      const user = await User.findOne({ where: { login } });
      const organizer_id = user.id

      const allToursByUser = await Tour.findAll({
          where: {organizer_id}, 
          order: [['id', 'DESC']],
          include:[{
            model:Image,
          }],
        });


      const allToursByUserPlain = allToursByUser.map((tour) => tour.get({ plain: true }));
      res.json(allToursByUserPlain);
    } catch (err) {
      console.log("🚀 ~ getAllToursByUser: ~ err:", err)
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
          {
            model: Image,
          },
        ],
      });
      const oneTourPlain = oneTour.get({ plain: true });
      res.json(oneTourPlain);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log('Ошибка в ручке getOneTour', error);
    }
  },

  postTourRating: async (req, res) => {
    const { login } = req.session;
    const user = await User.findOne({ where: { login } });
  
    const tourId = req.params.id;
  
    try {
      const { rating } = req.body;
  
      const existingRating = await Review.findOne({ 
        where: {
          user_id: user.id,
          tour_id: tourId,
        } 
      });
  
      if (existingRating) {
        await Review.update(
          { rating: rating },
          {
            where: {
              user_id: user.id,
              tour_id: tourId,
            },
          }
        );
  
        const ratings = await Review.findAll({
          where: { tour_id: tourId },
          attributes: ['rating'],
        });
  
        const average_rating = ratings.length > 0
          ? (ratings.reduce((acc, num) => acc + num.rating, 0) / ratings.length).toFixed(1)
          : '0';
  
        const tour = await Tour.findByPk(tourId);
        tour.average_rating = average_rating;
        await tour.save();
  
        return res.json({ ratingMessage: 'Ваша оценка обновлена!', tour });
      }
  
      await Review.create({
        user_id: user.id,
        tour_id: tourId,
        rating: rating,
      });
  
      const ratings = await Review.findAll({
        where: { tour_id: tourId },
        attributes: ['rating'],
      });

      const average_rating = ratings.length > 0
        ? (ratings.reduce((acc, num) => acc + num.rating, 0) / ratings.length).toFixed(1)
        : '0';
  
      const tour = await Tour.findByPk(tourId);
      tour.average_rating = average_rating;
      await tour.save();
  
      return res.json({ ratingMessage: 'Ваша оценка добавлена!', tour });
  
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.error('Ошибка в ручке postTourRating', error);
    }
  },

  getOneRating: async (req, res) => {

    const { login } = req.session;
    const user = await User.findOne({ where: { login } });

    const tourId = req.params.id;

    try {
      const oneReview = await Review.findOne({
        where: { 
          tour_id: tourId,
          user_id: user.id
        }
      });
      const oneReviewPlain = oneReview.get({ plain: true });
      res.json(oneReviewPlain);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.error('Ошибка в ручке getOneRating', error)
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
      // console.log('*__________________*', discountedToursPlain);
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
      housings,
      coordinates,
  } = req.body;

  console.log('\n\n\n----------------------------------',typeof coordinates);

  const images = req.files.map((file) => `/src/assets/images/${file.filename}`);

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
        coordinates,
      });
      // console.log(createdTour);
      const jsonImages = JSON.stringify(images);

  Image.create({image_path:jsonImages,tour_id:createdTour.id}) //! news_id:null
      
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

  deleteTour: async (req, res) => {
    const { id } = req.params;
    try {
      const tour = await Tour.findOne({ where: { id } });

      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }

      await TourOption.destroy({ where: { tour_id: id } });
      await Image.destroy({ where: { tour_id: id } });

      const result = await Tour.destroy({ where: { id } });

      if (result) {
        res.sendStatus(204); // 204 No Content
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },
};
      