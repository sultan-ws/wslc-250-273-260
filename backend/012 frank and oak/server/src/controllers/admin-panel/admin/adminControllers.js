const Admin = require("../../../models/admin/admin");
require('dotenv').config();

const registerAdmin = async () => {
    const ifAdmin = await Admin.find();

    if (ifAdmin.length !== 0) return console.log(ifAdmin[0]);

    const data = new Admin({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    });

    const response = await data.save();

    console.log(response);

};

const login = async (req, res) => {
    try {

        const adminData = await Admin.findOne({ email: req.body.email });

        if (!adminData) return res.status(401).json({ message: 'please provide a valid email' });

        if (adminData.password !== req.body.password) return res.status(401).json({ message: 'please provide valid password' });

        res.status(200).json({ message: 'success', data: adminData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'insernal server error' });
    }
};

const readAdmin = async (req, res) => {
    try {
        const response = await Admin.find();

        // const {password, ...dataWithoutPassword} = response[0]._doc;

        // console.log(dataWithoutPassword);

        const path =  `${req.protocol}://${req.get('host')}/fran-and-oak-files/admin/`;

        res.status(200).json({message : 'success', data: response, path});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'insernal server error' });
    }
};

const updateAdmin = async(req, res) => {
    try{
        const data = req.body;

        if(req.files){
            if(req.files.logo){
                data.logo = req.files.logo[0].filename

            }

            if(req.files.fav_icon){
                data.fav_icon = req.files.fav_icon[0].filename
            }

            if(req.files.footer_logo){
                data.footer_logo = req.files.footer_logo[0].filename
            }
        }


        console.log(data);

        const response = await Admin.updateOne(
            req.params,
            { $set: data }
        );
        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    registerAdmin,
    login,
    readAdmin,
    updateAdmin
};