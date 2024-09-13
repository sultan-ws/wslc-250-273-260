const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    description:String,
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
    },
    updated_at:{
        type:Date,
    }
});

categorySchema.pre('save', (next)=>{
    const currentDate = new Date();

    if(this.new){
        this.created_at = currentDate;
    }
    else{
        this.updated_at = currentDate;
    }

    next();
});

const ParentCategory = mongoose.model('parent_categoris', categorySchema);

module.exports = ParentCategory;