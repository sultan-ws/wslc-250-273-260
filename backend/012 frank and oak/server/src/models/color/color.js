const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
    }
});

const Colors = mongoose.model('colors', colorSchema);

module.exports = Colors;