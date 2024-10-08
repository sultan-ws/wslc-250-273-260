const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    short_description: String,
    thumbnail: String,
    hover_thumbnail: String,
    gallery: Object,
    price: Number,
    actual_price: Number,
    parent_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parent_categoris'
    },
    product_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_categories'
    },
    stock: {
        type: Boolean,
        default: true
    },
    brand: String,
    sizes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'sizes'
    }],
    colors:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'colors'
    }],
    created_at:Date,
    updated_at:Date,
    status:{
        type:Boolean,
        default:true
    }
});

productSchema.pre('save', function(next) {
    const currentDate = new Date();
    
    if (this.isNew) { 
        this.created_at = currentDate;
    }
    next();
});

productSchema.pre('updateOne', function(next) {
    this.set({ updated_at: new Date() });
    next();
});

productSchema.pre('findByIdAndUpdate', function(next) {
    this.set({ updated_at: new Date() });
    next();
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;