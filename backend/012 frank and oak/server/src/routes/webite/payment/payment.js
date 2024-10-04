const express = require('express');
const { toPay } = require('../../../controllers/website/payment/paymentControllers');

const paymentRoutes = express.Router();

paymentRoutes.post('/pay', toPay);

module.exports = paymentRoutes

