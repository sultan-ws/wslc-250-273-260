const express = require('express');
const allRoutes = require('./src/app');
require('dotenv').config();
require('./src/db/config');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/fran-and-oak-files/product-category', express.static('src/uploads/product-category'));
app.use('/api', allRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});