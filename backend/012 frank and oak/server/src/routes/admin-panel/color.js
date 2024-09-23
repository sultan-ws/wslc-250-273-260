const express = require('express');
const { addColor, trueColors } = require('../../controllers/controllers');

const colorRouter = express.Router();

colorRouter.post('/add-color', addColor);
colorRouter.get('/active-colors', trueColors)

module.exports = colorRouter;