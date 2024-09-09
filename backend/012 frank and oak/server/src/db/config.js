const mongoose = require('mongoose');
const {registerAdmin} = require('../controllers/admin-panel/admin/adminControllers');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_APP_NAME}.f3yzdsd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

mongoose.connect(url)
.then(() => {
    console.log('Connected to DB');
    registerAdmin();
})
.catch(err => console.log(err.message));