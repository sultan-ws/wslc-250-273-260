const express = require('express');
const adminRoutes = require('./routes/admin-panel/admin');
const colorRouter = require('./routes/admin-panel/color');
const parentCategoryRouter = require('./routes/admin-panel/parentCategory');
const productCategoryRouter = require('./routes/admin-panel/productCategory');
const sizeRouter = require('./routes/admin-panel/size');
const productRouter = require('./routes/admin-panel/product');
const userRouter = require('./routes/webite/users/user');
const cartRouter = require('./routes/webite/cart/cart');
const webProductRouter = require('./routes/webite/product/product');



const adminRouter = express.Router();
const webRouter = express.Router();
const allRoutes = express.Router();

adminRouter.use('/admin', adminRoutes);
adminRouter.use('/color', colorRouter);
adminRouter.use('/parent-category', parentCategoryRouter);
adminRouter.use('/product-category', productCategoryRouter);
adminRouter.use('/size', sizeRouter);
adminRouter.use('/product', productRouter);


webRouter.use('/user', userRouter);
webRouter.use('/cart', cartRouter);
webRouter.use('/products', webProductRouter);

allRoutes.use('/admin-panel', adminRouter);
allRoutes.use('/frank-and-oak-services', webRouter);



module.exports = allRoutes;