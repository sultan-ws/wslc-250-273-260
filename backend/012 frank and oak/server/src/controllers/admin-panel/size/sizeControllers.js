const Size = require("../../../models/size/size");

const trueSizes = async (req, res) => {
    try{
        const response = await Size.find({status: true});

        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    trueSizes
}