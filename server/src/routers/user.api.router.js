const router = require('express').Router();

const {
createUser,
getAllUsers,
getOneUser,
destroyUser,
loginUser
} = require('../controllers/user-controller');

router
  .get('/', getAllUsers)
  .post('/', createUser)
  .post('/login', loginUser)
  .delete('/', destroyUser)
  .post('/find', getOneUser);
module.exports = router;
