const express = require('express');
const { addProductCategory, readProductCategory } = require('../../controllers/controllers');
const filesUploads = require('../../middlewares/multer/multer');

const productCategoryRouter = express.Router();

productCategoryRouter.post('/add-category', filesUploads('product-category'), addProductCategory);
productCategoryRouter.get('/read-category', readProductCategory);

module.exports = productCategoryRouter;