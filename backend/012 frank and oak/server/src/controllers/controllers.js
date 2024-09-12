
//admin controllers
const {
    login
} = require("./admin-panel/admin/adminControllers");


// color controllers
const { addColor } = require("./admin-panel/color/colorControllers");

// parent category controllers
const {
    addParentCategory,
    readParentCategory,
    deleteParentCategory,
    upadateStatus
} = require("./admin-panel/parent-category/parentCategoryControllers");

module.exports = {
    login,
    addColor,
    addParentCategory,
    readParentCategory,
    deleteParentCategory,
    upadateStatus
}