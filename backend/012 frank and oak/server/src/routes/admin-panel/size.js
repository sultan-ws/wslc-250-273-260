const express = require('express');
const { trueSizes, addSize } = require('../../controllers/controllers');

const sizeRouter = express.Router();

sizeRouter.post('/insert-size', addSize);
sizeRouter.get('/active-sizes', trueSizes);

module.exports = sizeRouter;