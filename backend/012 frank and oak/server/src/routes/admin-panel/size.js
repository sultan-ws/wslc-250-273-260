const express = require('express');
const { trueSizes } = require('../../controllers/controllers');

const sizeRouter = express.Router();

sizeRouter.get('/active-sizes', trueSizes);

module.exports = sizeRouter;