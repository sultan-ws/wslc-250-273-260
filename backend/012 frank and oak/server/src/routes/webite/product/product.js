const express = require('express');
const { webReadProducts } = require('../../../controllers/controllers');

const webProductRouter = express.Router();

webProductRouter.get('/read-products', webReadProducts);

module.exports = webProductRouter;