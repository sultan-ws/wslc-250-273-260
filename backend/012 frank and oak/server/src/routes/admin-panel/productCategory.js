const express = require('express');
const { addProductCategory } = require('../../controllers/controllers');
const filesUploads = require('../../middlewares/multer/multer');

const productCategoryRouter = express.Router();

productCategoryRouter.post('/add-category', filesUploads('product-category'), addProductCategory);

module.exports = productCategoryRouter;