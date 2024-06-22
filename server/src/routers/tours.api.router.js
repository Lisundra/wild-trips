const router = require('express').Router();
const multer = require('multer');
const path = require('path')
console.log('Все картинки туров хранятся по адресу:',path.join(__dirname, '../../../client/src/assets/images/'));

// const upload = multer({ dest: '../client/src/assets/images' }); // Укажите путь, куда будут загружаться файлы
const storageToursImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../client/src/assets/images') );
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-[Tour-Image]-' + file.originalname);
  }
});
const upload = multer({ storage: storageToursImages });


const {
  getAllTours,
  getAllToursByUser,
  getOneTour,
  getDiscountedTours,
  getEditorsTours,
  getNewTours,
  getAllOptions,
  createTour,
  // deleteTour,
  // editTour,
} = require('../controllers/tours-controller');

router
  .get('/', getAllTours)
  .get('/org', getAllToursByUser)
  .get('/:id', getOneTour)
  .get('/discounted', getDiscountedTours)
  .get('/editors', getEditorsTours)
  .get('/new', getNewTours)
  .post('/checkBox', getAllOptions)
  .post('/',upload.array('images',10), createTour);
  // .patch('/:id', editTour)
  // .delete('/:id', deleteTour);
  
module.exports = router;