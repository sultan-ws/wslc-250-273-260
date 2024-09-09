const Admin = require("../../../models/admin/admin");
require('dotenv').config();

const registerAdmin = async()=>{
    const ifAdmin = await Admin.find();

    if(ifAdmin.length !== 0) return console.log(ifAdmin[0]);

    const data = new Admin({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    });

    const response = await data.save();

    console.log(response);
    
};

const login = async (req, res)=>{
    try{

        const adminData = await Admin.findOne({email: req.body.email});

        if(!adminData) return res.status(401).json({message: 'please provide a valid email'});

        if(adminData.password !==  req.body.password) return res.status(401).json({message: 'please provide valid password'});

        res.status(200).json({message: 'success', data: adminData});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'insernal server error'});
    }
};

module.exports = {
    registerAdmin,
    login
};