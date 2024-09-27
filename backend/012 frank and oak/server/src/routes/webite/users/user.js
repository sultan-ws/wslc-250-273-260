const express = require('express');
const { genrateOtp, registerUser, userLogin } = require('../../../controllers/controllers');

const userRouter = express.Router();

userRouter.post('/genrate-otp', genrateOtp);
userRouter.post('/register', registerUser);
userRouter.post('/login', userLogin);

module.exports = userRouter;