const { User } = require('../../db/models');
const bcrypt = require('bcrypt'); 
const path = require('path')


module.exports = {
  getAllUsers: async (req, res) => {
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
    console.log( req.body);
    const profile_picture = req.file ? path.join(__dirname, '../../../client/src/assets/avatars/',req.file.filename) : 'src/assets/avatars/ava.png';
    console.log("🚀 ~ createUser: ~ profile_picture:", profile_picture)

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
            profile_picture
        }

        
      const user = await User.create(UserData);

      console.log("🚀 ~ createUser: ~ req.session:", req.session)
      console.log("🚀 ~ createUser: ~ req.session.role :", req.session.role )
      req.session.login = user.login; // или EMAIL или MAIL
      req.session.role = user.role
      req.session.save((err) => {
        if(err)
        console.log('err saving', err);

          res.status(200).json({ message: `Registration succes ${login}`, login: user.login, src:profile_picture }); // для fetch-a
          // res.redirect('/');

        });
        console.log("🚀 ~ CREATED: ~ req.session:", req.session)
        console.log("🚀 ~ CREATED: ~ req.session.role :", req.session.role )

      }else{
      res.status(200).json(null); 
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
          return  res.json({ message: `Добро пожаловать!`, src:userInDb.profile_picture}) 
          }else{
            return   res.json({ message: `Пароль введён неверно`, err:'err password'}) 
          } 
        }else{
          return  res.json({ message: `Такого аккаунта не найдено`, err:'err login'}) 
        }
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  destroyUser: async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.status(400).json({ err: err.message });
        } else {
          res.clearCookie('LogTrip');
          res.status(200).json(null);
        }
      });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },
  checkSession: async (req, res) => { //? Может быть, не нужна проверка куки на сервере
    try {
      // console.log(req.session.login);
      // res.send('ok')
      // const sessionAsync = await req.session.login
      // console.log("🚀 ~ checkSession: ~ sessionAsync:", sessionAsync)
  
        console.log("🚀 ~ checkSession: ~ req.session:", req.session)
        console.log("🚀 ~ checkSession: ~ req.session.role :", req.session.role )
        if(req.session.login){   
          const {login}= req.session
          const user = await User.findOne({ where: { login } });

          res.json({login:req.session.login, role:req.session.role, src:user.profile_picture})

        }
        else res.json(null)
      // // console.log('In checkSession');
      // console.log("🚀 ~ checkSession:", req.session)
      // console.log("🚀 ~ checkSession: login", req.session.login)
      // req.session.login?
      // res.status(200).json({ message: 'session working'})
      // :
      // res.status(400).json(null)
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

};
