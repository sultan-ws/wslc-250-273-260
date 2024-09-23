const express = require('express');
const { addProductCategory, readProductCategory, productCategoryByParentCategory } = require('../../controllers/controllers');
const filesUploads = require('../../middlewares/multer/multer');

const productCategoryRouter = express.Router();

productCategoryRouter.post('/add-category', filesUploads('product-category'), addProductCategory);
productCategoryRouter.get('/read-category', readProductCategory);
productCategoryRouter.get('/read-category-by-parent-category/:parent_category', productCategoryByParentCategory);

module.exports = productCategoryRouter;