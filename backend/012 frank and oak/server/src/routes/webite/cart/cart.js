const express = require('express');
const { addToCart } = require('../../../controllers/controllers');

const cartRouter = express.Router();

cartRouter.post('/add-to-cart', addToCart);

module.exports = cartRouter;