const nodemailer = require('nodemailer');
const otpStore = new Map();

const genrateOtp = async(req, res)=>{
    try{
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

        transporter.sendMail(mailOption, (error, info)=>{
            if(error) return res.status(500).json({message: 'something went wrong'});

            res.status(200).json({message: 'otp has been sent on email'});
        })
    }
    catch(error){
        res.status(500).json({message: 'internal server error'});
        console.log(error);
    }
};

module.exports = {
    genrateOtp
}