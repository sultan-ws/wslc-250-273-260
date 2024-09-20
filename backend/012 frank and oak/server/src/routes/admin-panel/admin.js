const express = require('express');
const { login,
    readAdmin,
    updateAdmin,
    genrateOtpToUpdateEmail,
    upadteAdminEmail
} = require('../../controllers/controllers');
const filesUploads = require('../../middlewares/multer/multer');

const adminRoutes = express.Router();

adminRoutes.post('/log-in', login);
adminRoutes.get('/read-admin', readAdmin);
adminRoutes.put('/update-admin/:_id', filesUploads('admin'), updateAdmin);
adminRoutes.post('/genrate-otp', genrateOtpToUpdateEmail);
adminRoutes.put('/update-email', upadteAdminEmail);

module.exports = adminRoutes;