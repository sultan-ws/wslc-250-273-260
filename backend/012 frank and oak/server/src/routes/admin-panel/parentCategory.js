const express = require('express');
const {
     addParentCategory,
     readParentCategory,
     deleteParentCategory, 
     upadateStatus, 
     deleteMultipleParentCategories,
     readParentCategoryById,
     upadteParentCategory,
     searchParentCategory
    } = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/add-category', addParentCategory);
parentCategoryRouter.get('/read-categories', readParentCategory);
parentCategoryRouter.delete('/delete-category/:_id', deleteParentCategory);
parentCategoryRouter.put('/update-status/:_id', upadateStatus);
parentCategoryRouter.put('/delete-categories', deleteMultipleParentCategories);
parentCategoryRouter.get('/category-by-id/:_id', readParentCategoryById);
parentCategoryRouter.put('/update-category/:_id', upadteParentCategory);
parentCategoryRouter.get('/search-category/:key', searchParentCategory)

module.exports = parentCategoryRouter;