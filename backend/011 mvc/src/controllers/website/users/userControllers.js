const { User } = require("../../../models/models");

const registerUser = async(req, res)=>{
    try{
        // User
        res.status(200).json({message: 'success'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = registerUser;