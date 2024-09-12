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

const readParentCategory = async (req, res) => {
    try{
        const response = await ParentCategory.find();

        res.status(200).json({message: 'data fetched successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const deleteParentCategory = async ( req, res) => {
    try{
        const response = await ParentCategory.deleteOne(req.params);


        res.status(200).json({message: 'data fetched successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const upadateStatus = async (req, res) => {
    try{
        const response = await ParentCategory.updateOne(
            req.params,
            {
                $set:{status: req.body.newStatus}
            }
        );


        res.status(200).json({message: 'data fetched successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    addParentCategory,
    readParentCategory,
    deleteParentCategory,
    upadateStatus
}