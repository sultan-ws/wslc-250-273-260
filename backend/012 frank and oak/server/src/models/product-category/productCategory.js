const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail:String,
    parent_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parent_categoris'
    },
    description:String,
    status:{
        type:Boolean,
        default:true
    },
    created_at:Date,
    updated_at:Date
});

categorySchema.pre('save' ,(next)=>{
    const currentDate = new Date();
    this.created_at = currentDate;

    next();
});

categorySchema.pre('updateOne', (next)=>{
    const currentDate = new Date();
    this.updated_at = currentDate;

    next();
});

categorySchema.pre('findAndUpdateOne', (next)=>{
    const currentDate = new Date();
    this.updated_at = currentDate;

    next();
});

categorySchema.pre('findByIdAndUpdate', (next)=>{
    const currentDate = new Date();
    this.updated_at = currentDate;

    next();
});

const ProductCategory = mongoose.model('product_categories', categorySchema);

module.exports = ProductCategory;
