const express = require('express');
const {
     addParentCategory,
     readParentCategory,
     deleteParentCategory, 
     upadateStatus 
    } = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/add-category', addParentCategory);
parentCategoryRouter.get('/read-categories', readParentCategory);
parentCategoryRouter.delete('/delete-category/:_id', deleteParentCategory);
parentCategoryRouter.put('/update-status/:_id', upadateStatus)

module.exports = parentCategoryRouter;