const router = require('express').Router();

const {
    sendSubscriptionConfirmation,
} = require('../controllers/subscribe-controller');

router
    .post('/', sendSubscriptionConfirmation)

module.exports = router;