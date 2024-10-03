const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    color:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colors',
    },
    size:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sizes',
    },
    quantity:{
        type:Number,
        default:1
    },
    status:{
        type:String,
        enum:['purchased', 'not purchased'],
        default: 'not purchased'
    },
    created_at:Date,
    updated_at:Date
});

cartSchema.pre('save', function(next){
    const currentDate = new Date();
    this.created_at = currentDate;

    next();
});

cartSchema.pre('updateOne', function(next){
    const currentDate = new Date();
    this.updated_at = currentDate;

    next();
});

cartSchema.pre('findByIdAndUpdate', function(next){
    const currentDate = new Date();
    this.updated_at = currentDate;

    next();
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;