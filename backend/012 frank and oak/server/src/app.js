const express = require('express');
const adminRoutes = require('./routes/admin-panel/admin');



const adminRouter = express.Router();
const webRouter = express.Router();
const allRoutes = express.Router();

adminRouter.use('/admin', adminRoutes);


allRoutes.use('/admin-panel', adminRouter);
allRoutes.use('/frank-and-oak-services', webRouter);



module.exports = allRoutes;