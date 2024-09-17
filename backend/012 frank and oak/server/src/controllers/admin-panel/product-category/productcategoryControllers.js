const ProductCategory = require("../../../models/product-category/productCategory");

const addProductCategory = async (req, res) => {
    try{
        const data = req.body;

        if(req.files.thumbnail){
            data.thumbnail = req.files.thumbnail[0].filename
        };

        console.log(data);

        const dataToSave = new ProductCategory(data);

        const response = await dataToSave.save();

        console.log(response);
        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:'internal server error'});
    }
};

module.exports = {
    addProductCategory
}