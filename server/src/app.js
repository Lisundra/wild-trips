require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const session = require('express-session');  
const multer = require('multer');


const FileStore = require('session-file-store')(session);
const app = express();
const logger = require('morgan');

const apiRouter = require('./routers/api.router.js');
const userCheckRouter = require('./routers/checkUser.router')
const PORT = process.env.PORT;

const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
const sessionConfig = {
  name: 'LogTrip', // не забудь указать то же имя и при удалении куки
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Mellon', // SESSION_SECRET в .env
  resave: false, // если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 24 * 1000 * 60 * 60, // время жизни в ms, 24(h)*1000(ms)*60(sec)*60(min) = 86400000
    httpOnly: true, // секьюрность, оставляем true
  },
};

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public/')));
app.use(session(sessionConfig));
// app.use((req, res, next) => {
//   console.log('Содержимое сессии:', req.session);
//   next();
// });

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
