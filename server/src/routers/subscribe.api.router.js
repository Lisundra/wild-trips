const router = require('express').Router();
const { sendSubscriptionConfirmation } = require('../controllers/subscribe-controller');

// Обработка POST запросов на /api/subscribe
router.post('/', sendSubscriptionConfirmation);



// Обработка GET запросов на /api/subscribe
router.get('/', (req, res) => {
  res.send('GET запрос успешно обработан');
});

module.exports = router;


