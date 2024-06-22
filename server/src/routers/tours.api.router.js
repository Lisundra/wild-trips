const router = require('express').Router();
const multer = require('multer');
const path = require('path')
console.log(path.join(__dirname, '../../../client/src/assets/images/'));


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
  .get('/discounted', getDiscountedTours)
  .get('/editors', getEditorsTours)
  .get('/new', getNewTours)
  .get('/', getAllTours)
  .get('/:id', getOneTour)
  .post('/checkBox', getAllOptions)
  .post('/',upload.array('images',10), createTour);
  // .patch('/:id', editTour)
  // .delete('/:id', deleteTour);
  
module.exports = router;