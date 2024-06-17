const postRouter = require('./post.api.router');
const apiRouter = require('express').Router();

apiRouter.use('/posts', postRouter);

module.exports = apiRouter;
