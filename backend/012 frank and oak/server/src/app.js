const express = require('express');
const adminRoutes = require('./routes/admin-panel/admin');
const colorRouter = require('./routes/admin-panel/color');
const parentCategoryRouter = require('./routes/admin-panel/parentCategory');
const productCategoryRouter = require('./routes/admin-panel/productCategory');



const adminRouter = express.Router();
const webRouter = express.Router();
const allRoutes = express.Router();

adminRouter.use('/admin', adminRoutes);
adminRouter.use('/color', colorRouter);
adminRouter.use('/parent-category', parentCategoryRouter);
adminRouter.use('/product-category', productCategoryRouter);


allRoutes.use('/admin-panel', adminRouter);
allRoutes.use('/frank-and-oak-services', webRouter);



module.exports = allRoutes;