const router = require('express').Router();

const {
  getAllTours,
  getOneTour,
  getDiscountedTours,
  getEditorsTours,
  getNewTours,
  createTour,
  // deleteTour,
  // editTour,
} = require('../controllers/tours-controller');

router
  .get('/', getAllTours)
  .get('/:id', getOneTour)
  .get('/discounted', getDiscountedTours)
  .get('/editors', getEditorsTours)
  .get('/new', getNewTours)
  .post('/checkBox', getAllOptions)
  .post('/', createTour);
  // .patch('/:id', editTour)
  // .delete('/:id', deleteTour);
  
module.exports = router;
