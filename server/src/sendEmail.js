const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'adm1n-account-testing@yandex.ru',
        pass: 'wqxcaquzroiiqdkf',
    },
},

{
    from: 'Wild Tours adm1n-account-testing@yandex.ru',
  },
);

  const sendEmail = (message) => {
    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent successfully', info);
        }
        transporter.close();
    });
}

module.exports = sendEmail;