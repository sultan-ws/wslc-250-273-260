const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    name:String,
    size:String,
    status:{
        type:Boolean,
        default:true
    }
});

const Size = mongoose.model('sizes', sizeSchema);

module.exports = Size;