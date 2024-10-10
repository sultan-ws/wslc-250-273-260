const express = require('express');
const { toPay } = require('../../../controllers/website/payment/paymentControllers');
const verifyJWT = require('../../../middlewares/jwt/verifyJwt');

const paymentRoutes = express.Router();

paymentRoutes.post('/pay', verifyJWT, toPay);

module.exports = paymentRoutes

