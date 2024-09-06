const express = require('express');
const { 
    userRouter, 
    productRouter 
} = require('./routes/routes');


const allRoutes = express.Router();

const websiteRouter = express.Router();
const adminRoutes = express.Router();

websiteRouter.use('/user',userRouter);
websiteRouter.use('/product',productRouter);


allRoutes.use('/admin', adminRoutes);
allRoutes.use('/website', websiteRouter);

module.exports = allRoutes;