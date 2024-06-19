const userCheckRouter = require('express').Router();

userCheckRouter.post('/checkUser', async (req, res) => { //? Может быть, не нужна проверка куки на сервере
    try {

        console.log('userCheckRouter', req.session);
        console.log('userCheckRouter', req.session.login);

        req.session.login?
       res.status(200).json({ message: 'session working'})
       :
       res.status(400).json(null)
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },
) 



module.exports = userCheckRouter;
