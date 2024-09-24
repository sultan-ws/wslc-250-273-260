const multer = require('multer');
const path = require('path');

const multerStorage = (foldername)=> multer.diskStorage({
    destination: (req, file, cb) => {


        if(foldername === 'products'){
            cb(null, `src/uploads/${foldername}/${file.fieldname}`);
        }
        else{
            cb(null, `src/uploads/${foldername}`)
        }
        console.log(file)
        
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, Date.now() + Math.floor(Math.random() * 100000) + extname);
    }
});

const filesUploads = (foldername)=> multer({storage: multerStorage(foldername)}).fields([
    {
        name:'thumbnail',
        maxCount: 1
    },
    {
        name:'logo',
        maxCount: 1
    },
    {
        name:'fav_icon',
        maxCount: 1
    },
    {
        name:'footer_logo',
        maxCount: 1
    },
    {
        name:'hover_thumbnail',
        maxCount: 1
    },
    {
        name:'gallery',
        maxCount: 12
    }
]);

module.exports = filesUploads;