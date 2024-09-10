const express = require('express');
const { addColor } = require('../../controllers/controllers');

const colorRouter = express.Router();

colorRouter.post('/add-color', addColor);

module.exports = colorRouter;