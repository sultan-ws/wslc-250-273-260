
//admin controllers
const {
    login,
    readAdmin,
    updateAdmin,
    genrateOtpToUpdateEmail,
    upadteAdminEmail
} = require("./admin-panel/admin/adminControllers");


// color controllers
const { addColor, trueColors } = require("./admin-panel/color/colorControllers");

// parent category controllers
const {
    addParentCategory,
    readParentCategory,
    deleteParentCategory,
    upadateStatus,
    deleteMultipleParentCategories,
    readParentCategoryById,
    upadteParentCategory,
    searchParentCategory,
    trueParentCategory
} = require("./admin-panel/parent-category/parentCategoryControllers");

// product category
const { 
    addProductCategory, 
    readProductCategory,
    productCategoryByParentCategory
} = require("./admin-panel/product-category/productcategoryControllers");
const { insertProduct, readProducts } = require("./admin-panel/product/productControllers");

//size controller
const { trueSizes } = require("./admin-panel/size/sizeControllers");


// website controllers
const { genrateOtp, registerUser, userLogin } = require("./website/user/userControllers");

module.exports = {
    login,
    addColor,
    addParentCategory,
    readParentCategory,
    deleteParentCategory,
    upadateStatus,
    deleteMultipleParentCategories,
    readParentCategoryById,
    upadteParentCategory,
    searchParentCategory,
    trueParentCategory,
    addProductCategory,
    readProductCategory,
    readAdmin,
    updateAdmin,
    genrateOtpToUpdateEmail,
    upadteAdminEmail,
    productCategoryByParentCategory,
    trueColors,
    trueSizes,
    insertProduct,
    readProducts,
    genrateOtp,
    registerUser,
    userLogin
};