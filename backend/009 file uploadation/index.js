const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());

const multerStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'uploads');
    },
    filename:(req, file, cb)=>{
        // console.log(file);
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + Math.floor(Math.random() * 99999) + ext);
    }
});

const upload = multer({storage:multerStorage}).single('image');

app.post('/insert-data',upload, (req,res)=>{
    try{
        const data = req.body;

        console.log(req.file);

        if(req.file){

            if(path.extname(req.file.filename) === '.jpeg' || path.extname(req.file.filename) === '.jpg'){
                data.image = req.file.filename
            }
            else{
                res.status(400).json({message:'Invalid file type'});

                fs.unlinkSync(path.join(__dirname, `uploads/${req.file.filename}`));
                return;
            }
            
        }
        console.log(data);
        res.status(200).json({message: 'data added successfully'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
});


app.listen(5200, ()=>{
    console.log('server is running on port 5200');
});