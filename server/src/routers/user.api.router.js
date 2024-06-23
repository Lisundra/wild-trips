const router = require('express').Router();
const multer = require('multer')
const path = require('path')
console.log('Все картинки аватарок хранятся по адресу:',
path.join(__dirname, '../../../client/src/assets/avatars'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../client/src/assets/avatars'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const {
createUser,
getAllUsers,
getOneUser,
destroyUser,
loginUser,
checkSession
} = require('../controllers/user-controller');

router
  .get('/', getAllUsers)
  .post('/',  upload.single('profile_picture'), createUser)
  .post('/login', loginUser)
  .delete('/', destroyUser)
  .post('/find', getOneUser)
  .post('/check', checkSession);
module.exports = router;
