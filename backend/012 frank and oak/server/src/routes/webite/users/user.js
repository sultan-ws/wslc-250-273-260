const express = require('express');
const { genrateOtp } = require('../../../controllers/controllers');

const userRouter = express.Router();

userRouter.post('/genrate-otp', genrateOtp)

module.exports = userRouter;