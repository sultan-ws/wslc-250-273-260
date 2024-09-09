const express = require('express');
const { login } = require('../../controllers/controllers');

const adminRoutes = express.Router();

adminRoutes.post('/log-in', login);

module.exports = adminRoutes;