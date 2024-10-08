const express = require('express');
const { addToCart } = require('../../../controllers/controllers');
const { readCart, deleteProduct, quentityUpdate } = require('../../../controllers/website/cart/cartControllers');

const cartRouter = express.Router();

cartRouter.post('/add-to-cart', addToCart);
cartRouter.get('/read-cart/:user', readCart);
cartRouter.delete('/delete-product/:id', deleteProduct);
cartRouter.put('/update-quentity/:_id', quentityUpdate);

module.exports = cartRouter;