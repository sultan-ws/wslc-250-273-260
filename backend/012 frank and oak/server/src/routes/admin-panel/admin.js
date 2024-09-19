const express = require('express');
const { login,
    readAdmin,
    updateAdmin
} = require('../../controllers/controllers');
const filesUploads = require('../../middlewares/multer/multer');

const adminRoutes = express.Router();

adminRoutes.post('/log-in', login);
adminRoutes.get('/read-admin', readAdmin);
adminRoutes.put('/update-admin/:_id', filesUploads('admin'), updateAdmin);

module.exports = adminRoutes;