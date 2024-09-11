const ParentCategory = require("../../../models/parent-category/parentCategory");

const addParentCategory = async(req, res)=>{

    console.log(req.body);
    try{
        const dataToSave = new ParentCategory(req.body);

        const response = await dataToSave.save();

        res.status(200).json({message: 'success', data: response});

    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    addParentCategory
}