const toursRouter = require('./tours.api.router'); 
const subscribeRouter = require('./subscribe.api.router'); 
const userRouter = require('./user.api.router') 
const apiRouter = require('express').Router(); 
 
apiRouter.use('/tours', toursRouter); 
apiRouter.use('/subscribe', subscribeRouter); 
apiRouter.use('/users', userRouter); 
 
module.exports = apiRouter;