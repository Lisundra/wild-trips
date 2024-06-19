const postRouter = require('./post.api.router');
const apiRouter = require('express').Router();
const toursRouter = require('express').Router();

apiRouter.use('/posts', postRouter);
apiRouter.use('/tours', toursRouter);

module.exports = apiRouter;
