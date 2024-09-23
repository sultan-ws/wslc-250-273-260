const Colors = require("../../../models/color/color");

const addColor = async( req, res ) =>{
    try{

        console.log(req.body);
        const dataToSave = new Colors(req.body);

        const response = await dataToSave.save();

        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Internal server error'});
    }
};

const trueColors = async(req, res) =>{ 
     try{

        const response = await Colors.find({status: true});

        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Internal server error'});
    }
}

module.exports = {
    addColor,
    trueColors
}