const nodemailer = require('nodemailer');
const User = require('../../../models/user/user');
const otpStore = new Map();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const genrateOtp = async (req, res) => {
    try {
        console.log(req.body);

        const genratedOtp = Math.floor(Math.random() * 100000);

        otpStore.set(req.body.email, genratedOtp);

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.DOMAIN_EMAIL,
                pass: process.env.APP_PASSWROD
            }
        });

        const mailOption = {
            from: 'noreply@mail.com',
            to: req.body.email,
            subject: 'OTP for update email',
            text: `Your OTP is ${genratedOtp}`
        };

        transporter.sendMail(mailOption, (error, info) => {
            if (error) return res.status(500).json({ message: 'something went wrong' });

            res.status(200).json({ message: 'otp has been sent on email' });
        })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' });
        console.log(error);
    }
};

const registerUser = async (req, res) => {
    try {
        const { email, password, f_name, l_name, otp } = req.body;

        bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
            console.log(hashedPassword);
            if (Number(otp) !== otpStore.get(email)) return res.status(401).json({ message: 'please provide a valid otp' });

            const dataToSave = new User({
                first_name: f_name,
                last_name: l_name,
                password:hashedPassword,
                email
            });



            const response = await dataToSave.save();

            const dataWithoutPasswrod = response._doc;

            jwt.sign(dataWithoutPasswrod, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 * 7 }, (error, token) => {
                if (error) return res.status(500).json({ message: 'something went wrong' });

                res.status(200).json({ message: 'success', data: response, auth: token });
            });
        })



    }
    catch (error) {
        console.log(errro);
        res.status(500).json({ message: 'internal server error' });
    }
}

const userLogin = async (req, res) => {
    try {
        console.log(req.body);

        const ifAdmin = await User.findOne({ email: req.body.email });

        if (!ifAdmin) return res.status(404).json({ message: 'please provide a valid email' });


        const isMatch = await bcrypt.compare(req.body.password, ifAdmin.password);

        if (!isMatch) return res.status(401).json({ message: 'please provide a valid password' });

        jwt.sign(ifAdmin._doc, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 * 7 }, (error, token) => {
            console.log(error)
            if (error) return res.status(500).json({ message: 'something went wrong' });

            res.status(200).json({ message: 'success', data: ifAdmin, auth: token });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

module.exports = {
    genrateOtp,
    registerUser,
    userLogin
}