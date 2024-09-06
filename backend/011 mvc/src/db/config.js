const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@sultan.f3yzdsd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`;

mongoose.connect(url)
.then(()=>{
    console.log('database conected');
})
.catch((error)=>{
    console.log(error);
});

