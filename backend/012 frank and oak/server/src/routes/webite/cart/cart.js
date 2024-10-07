const express = require('express');
const { addToCart } = require('../../../controllers/controllers');
const { readCart } = require('../../../controllers/website/cart/cartControllers');

const cartRouter = express.Router();

cartRouter.post('/add-to-cart', addToCart);
cartRouter.get('/read-cart/:user', readCart);

module.exports = cartRouter;