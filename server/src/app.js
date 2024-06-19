require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const apiRouter = require('./routers/api.router.js');

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public/')));
app.use(cors());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
