const express = require('express');
const token = 'user@123';

const app = express();

const middleware = (req, res, next)=>{
    const {userkey} = req.params;
    
    if(!userkey) return res.send('please provoide a key');

    if(userkey !== token) return res.send('please provoide a valid key');

    next();
}
// const m2 = (req, res, next)=>{
//     console.log('m2 called');

//     next();
// }

app.get('/user/:userkey?', middleware, ( req, res )=>{
    


    res.send('Welcome to my api');
});

app.listen(4400, ()=>{
    console.log('server is not running on 4400');
});

