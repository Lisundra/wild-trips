const { User } = require('../../db/models');
const bcrypt = require('bcrypt'); 
 
module.exports = {
  getAllUsers: async (_, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  getOneUser: async (req, res) => {
    try {
        const { login } = req.body;
        const user = await User.findOne({ where: { login } });
        res.json(user);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  createUser: async (req, res) => { //! Добавить возможность загрузки аватара
    const { login, email, password, full_name, role, bio } = req.body;

    try {
        console.log(login, email, password, full_name, role, bio );
      const userInDb = await User.findOne({ where: { login } });

      if(!userInDb){
        const hash = await bcrypt.hash(password, 10);

        const UserData = { 
            login, 
            email, 
            password:hash, 
            full_name, 
            role,   
            ...(bio && { bio }),
            profile_picture:'src/assets/avatars/ava.png' 
        }

      const user = await User.create(UserData);

      req.session.login = user.login; // или EMAIL или MAIL
      req.session.role = user.role
      req.session.save(() => {
          res.status(200).json({ message: `Registration succes ${login}`, login: user.login }); // для fetch-a
          // res.redirect('/');
        });
      }else{
      res.status(400).json({ err: `User with login ${login} already exists` }); 
      }

    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

//   checkSession: async (req, res) => { //? Может быть, не нужна проверка куки на сервере
//     try {
//         const { login } = req.body;
//         const user = await User.findOne({ where: { login } });
//         res.json(user);
//     } catch (err) {
//       res.status(400).json({ err: err.message });
//     }
//   },

  loginUser: async (req, res) => { //? Может быть, не нужна проверка куки на сервере

    const { login, password } = req.body;

    try {
        const userInDb = await User.findOne({ where: { login } });
        if(userInDb){
         const checkPass = await bcrypt.compare(password, userInDb.password);
         if (checkPass) {
            req.session.login = userInDb.login;
            req.session.role = userInDb.role;
            req.session.save(() => {
              console.log('Password correct. Session saved');
            });
            res.json({ message: `Password is correct`}) 
          }else{
            res.json({ message: `Password is incorrect`}) 
          } 
        }else{
            res.json({ message: `Login is incorrect`}) 
        }
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  destroyUser: async (req, res) => { //? Может быть, не нужна проверка куки на сервере
    try {
        req.session.destroy(() => {
            res.clearCookie('cookieName');
          });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

};
