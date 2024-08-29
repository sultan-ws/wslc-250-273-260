const express = require('express');


const app = express();

const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();

const m1 = (req, res, next)=>{
    console.log('middleware 1');
    next();
};
const m2 = (req, res, next)=>{
    console.log('middleware 2');
    next();
};
const m3 = (req, res, next)=>{
    console.log('middleware 3');
    next();
}

// const middelware = [m1, m2, m3];

// app.use(middelware);

router1.use(m1);
router2.use(m2);
router3.use(m3)

app.get('/', (req,res)=>{res.status(200).json({message:'app home route'})})

router1.get('/' , ( req, res ) => {
    res.status(200).json({message: 'welcome to my api hub'});
});

router1.post('/', ( req, res )=>{
    res.status(200).json({message: 'welcome to my api hub post'});
});

router2.put('/r2', ( req, res )=>{
    res.status(200).json({message: 'welcome to my api hub put'});
});


router3.delete('/', (req,res)=>{
    res.status(200).json({message: 'welcome to my api hub delete'});
});

app.use(router1);
app.use(router2);
app.use(router3);

app.listen(5000, ()=>{
    console.log('server is running on port 5000');
});