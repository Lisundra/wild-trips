const router = require('express').Router();
const multer = require('multer');
const path = require('path')
console.log('Все картинки туров хранятся по адресу:',path.join(__dirname, '../../../client/src/assets/images/'));


const storageToursImages = multer.diskStorage({
  destination(req, file, callback) {
    const uploadPath = `${__dirname}../../../../client/src/assets/images`;
    callback(null, uploadPath);
  },
  filename(req, file, callback) {
    const filename = Date.now() + `-[Tour-Image]-${file.originalname}`;
    callback(null, filename);
  },
});
const upload = multer({ storage: storageToursImages });


const {
  getAllTours,
  getAllToursByAdmin,
  getAllToursByUser,
  getOneTour,
  postTourRating,
  getOneRating,
  getDiscountedTours,
  getEditorsTours,
  getNewTours,
  getAllOptions,
  createTour,
  deleteTour,
  editTour,
} = require('../controllers/tours-controller');

router
  .get('/', getAllTours)
  .get('/discounted', getDiscountedTours)
  .get('/editors', getEditorsTours)
  .get('/new', getNewTours)
  .get('/:id', getOneTour)
  .post('/:id/rate', postTourRating)
  .get('/:id/rating', getOneRating)
  .get('/org/all', getAllToursByUser)
  .get('/admin/all', getAllToursByAdmin)
  // .get('/:id', getOneTour) //! в мерже закоментил, непонятный случай
  .post('/checkBox', getAllOptions)
  .post('/',upload.array('images',10), createTour)
  .patch('/:id',upload.array('images', 10), editTour)
  .delete('/:id', deleteTour);
  
module.exports = router;