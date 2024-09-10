
//admin controllers
const { 
    login
 } = require("./admin-panel/admin/adminControllers");


// color controllers
const { addColor } = require("./admin-panel/color/colorControllers");

module.exports = {
    login,
    addColor
}