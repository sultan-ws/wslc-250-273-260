const express = require('express');
const { insertProduct, readProducts } = require('../../controllers/controllers');
const filesUploads = require('../../middlewares/multer/multer');

const productRouter = express.Router();

productRouter.post('/insert-product',filesUploads('products'),  insertProduct);
productRouter.get('/read-product', readProducts);


module.exports = productRouter;