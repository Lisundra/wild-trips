const sendEmail = require('../sendEmail');

module.exports = {
    sendBookingConfirmation: (req, res) => {
    console.log('Маршрут на сервер работает');
    const { name, email } = req.body;
    console.log(name, email);

    // Генерация случайного четырёхзначного числа
    const generateRandomNumber = () => {
        return Math.floor(1000 + Math.random() * 9000);
      };
  
      const bookingNumber = generateRandomNumber();

    const message = {
      to: email,
      subject: `Заказ №${bookingNumber}`,
      html: `
          <h2>Здравствуйте, ${name}!</h2>
          <p>Мы получили вашу заявку на бронирование тура. В течение рабочего дня с вами свяжется наш менеджер для подтверждения заказа и уточнения деталей.</p>
          <p>Благодарим за выбор Wild Tours!</p>
        `,

    }
    sendEmail(message);
    console.log(message);
    res.send('Спасибо за заявку!');
  },
}; 