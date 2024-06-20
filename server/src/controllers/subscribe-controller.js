const sendEmail = require("../../sendEmail");




module.exports = {
  // sendSubscriptionConfirmation: async (req, res) => {
  //   const { email } = req.body;
  //   try {
  //     await sendEmail({
  //       email,
  //       subject: 'Успешная подписка на новые туры',
  //       message: 'Мы рады, что вам интересна тема путешествий — теперь мы сможем делиться с вами самыми интересными предложениями.',
  //     });
  //     res.status(200).json({ message: 'Subscription successful' });
  //   } catch (err) {
  //     res.status(400).json({ err: err.message });
  //   }
  // },

  sendRequest: (req, res) => {
    console.log('Маршрут на сервер работает');
    const { email } = req.body;
    console.log(email);
    res.send('Hello!');
  },
}; 



// async function sendEmail({ email, subject, message }) {
//   return new Promise((resolve, reject) => {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailConfigs = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: subject,
//       html: `<p>${message}</p><p>Best Regards</p>`,
//     };

//     transporter.sendMail(mailConfigs, (error, info) => {
//       if (error) {
//         console.log(error);
//         return reject({ message: 'An error has occurred' });
//       }
//       return resolve({ message: 'Email sent successfully' });
//     });
//   });
// }

