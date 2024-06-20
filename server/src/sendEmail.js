const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
    host: 'smtp.mail.ru',
    port: 465,
    secure: false,
    auth: {
        user: 'mkdeutsch2016@mail.ru',
        pass: 'mknpeople',
    },
},

{
    from: 'Wild Tours <mkdeutsch2016@mail.ru>',
  },
);

  const sendEmail = (message) => {
    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent successfully', info);
        }
        smtpTransport.close();
    });
}

export default sendEmail;