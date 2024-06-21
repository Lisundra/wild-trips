const sendEmail = require('../sendEmail');

module.exports = {
  sendSubscriptionConfirmation: (req, res) => {
    console.log('Маршрут на сервер работает');
    const { email } = req.body;
    console.log(email);
    const message = {
      to: email,
      subject: 'Успешная подписка на новые туры',
      html: `
          <h2>Благодарим за то, что вы теперь с нами!</h2>
          <p>Мы рады, что вам интересна тема путешествий — теперь мы сможем делиться с вами самыми интересными предложениями.</p>
        `,

    }
    sendEmail(message);
    console.log(message);
    res.send('Спасибо за заявку!');
  },
}; 


