const router = require('express').Router();

const {
  getAllPosts,
  createPost,
  deletePost,
} = require('../controllers/post-controller');

router
  .get('/', getAllPosts)
  .post('/', createPost)
  .delete('/:id', deletePost);

module.exports = router;
