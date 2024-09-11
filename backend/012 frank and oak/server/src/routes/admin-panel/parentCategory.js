const express = require('express');
const { addParentCategory } = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/add-category', addParentCategory);

module.exports = parentCategoryRouter;