const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@sultan.f3yzdsd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`)
.then(()=>{
    console.log('database connected');
})
.catch((error)=>{
    console.log(error);
});


const usersShema = new mongoose.Schema({
    name: String,
    email: String,
    contact:{
        type:Number,
        default:1234567890
    },
    status:{
        type:Boolean,
        default:true
    }
});

const User = mongoose.model('users', usersShema);

const insertData = async()=>{
    const data = {
        name:'sunil',
        // email:'sunil@gmail.com',
        contact:1222444000
    };
    
    const dataToSave = new User(data);

    const response = await dataToSave.save();

    console.log(response);
};

insertData();