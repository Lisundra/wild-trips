const postRouter = require('./post.api.router');
const userRouter = require('./user.api.router')
const apiRouter = require('express').Router();
const toursRouter = require('./tours.api.router')

apiRouter.use('/posts', postRouter);
apiRouter.use('/tours', toursRouter);
apiRouter.use('/users', userRouter);
// apiRouter.use('/checkBoxOptions', userRouter);

module.exports = apiRouter;
