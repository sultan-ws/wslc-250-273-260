const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next)=>{
    let auth = req.headers.authorization;

    if(!auth) return res.status(401).json({message: 'No token provided'});

    const token = auth.split(' ')[1];
    if(!token) return res.status(401).json({message: 'No token provided'});

    jwt.verify(token, process.env.JWT_KEY, (err, decode)=>{
        if(err){
            console.log(err);
            return res.status(401).json({messahe: 'invalid token'})
        } 

        req.decode = decode;
        next();
    })


};

module.exports = verifyJWT;

