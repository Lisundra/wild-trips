const router = require('express').Router();
const { sendBookingConfirmation } = require('../controllers/booking-controller');

// Обработка POST запросов на /api/booking
router.post('/', sendBookingConfirmation);



// Обработка GET запросов на /api/booking
router.get('/', (req, res) => {
  res.send('GET запрос успешно обработан');
});

module.exports = router;