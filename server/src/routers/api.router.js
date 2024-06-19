const postRouter = require('./post.api.router');
const userRouter = require('./user.api.router')
const apiRouter = require('express').Router();

apiRouter.use('/posts', postRouter);
apiRouter.use('/tours', toursRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
