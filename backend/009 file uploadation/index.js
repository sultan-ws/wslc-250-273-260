const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongodb = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbname = 'temp_users_data';

const client = new mongodb.MongoClient(url);

const config = async () => {
    await client.connect();

    const db = client.db(dbname);


    return db;
};

const app = express();

app.use(express.json());

app.use('/api-services', express.static('uploads'));

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        // console.log(file);
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + Math.floor(Math.random() * 99999) + ext);
    }
});

//*** single field with single file */
// const upload = multer({storage:multerStorage}).single('image');

//*** single field with multiple file */
// const upload = multer({storage:multerStorage}).array('images', 10);


//*** multiple fields */
const upload = multer({ storage: multerStorage }).fields(
    [
        { name: 'images', maxCount: 10 },
        { name: 'thumbnail', maxCount: 1 },

    ]
);

app.post('/insert-data', upload, async (req, res) => {

    const db = await config();
    const users = db.collection('users');

    try {
        const data = req.body;
        const files = req.files;

        // console.log(req.file);  if single file to be uploaded
        //console.log(req.files);  //multiple files to be uploaded

        if (req.files) {
            data.thumbnail = req.files.thumbnail[0].filename;

            data.images = req.files.images.map((image) => (image.filename));
        }



        const response = await users.insertOne(data);

        res.status(200).json({ message: 'data added successfully', data: response });

        // if(req.file){

        //     if(path.extname(req.file.filename) === '.jpeg' || path.extname(req.file.filename) === '.jpg'){
        //         data.image = req.file.filename
        //     }
        //     else{
        //         res.status(400).json({message:'Invalid file type'});

        //         fs.unlinkSync(path.join(__dirname, `uploads/${req.file.filename}`));
        //         return;
        //     }

        // }


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
});

app.get('/read-users', async (req, res) => {
    const db = await config();
    const users = db.collection('users');

    const filePath = `${req.protocol}://${req.get('host')}/api-services`;

    try {
        const response = await users.find().toArray();

        res.status(200).json({ message: 'data fetched successfully', data: response, file_path: filePath });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ messsage: 'internal server error' });
    }
});

app.get('/read-user-by-id/:id', async (req, res) => {
    const db = await config();
    const users = db.collection('users');

    try {
        const response = await users.find({ _id: new mongodb.ObjectId(req.params.id) }).toArray();
        res.status(200).json({ message: 'data fetched successfully', data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
});

app.put('/update-user/:id', upload, async (req, res) => {
    const db = await config();
    const users = db.collection('users');
    try {
        const newData = req.body;

        const preData = await users.find({ _id: new mongodb.ObjectId(req.params.id) }).toArray();


        if (req.files.thumbnail) {
            newData.thumbnail = req.files.thumbnail[0].filename;

            if (preData[0].thumbnail) {
                fs.unlinkSync(path.join(__dirname, `uploads/${preData[0].thumbnail}`));
            }
        }

        if (req.files.images) {
            newData.images = req.files.images.map((image) => (image.filename));

            if (preData[0].images) {

                preData[0].images.forEach((img) => {
                    if (fs.existsSync(path.join(__dirname, `uploads/${img}`))) {
                        fs.unlinkSync(path.join(__dirname, `uploads/${img}`));
                    }
                });

            }
        }

        // console.log(newData);

        const response = await users.updateOne(
            {
                _id: new mongodb.ObjectId(req.params.id)
            },
            {
                $set: newData
            }
        );

        res.status(200).json({ message: 'success', data: 'response' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
});


app.delete('/delete-user/:id', async (req, res) => {
    const db = await config();
    const users = db.collection('users');

    try {
        const preData = await users.findOne({ _id: new mongodb.ObjectId(req.params.id) });

        console.log(preData);

        if (preData.thumbnail) {
            fs.unlinkSync(path.join(__dirname, `uploads/${preData.thumbnail}`));
        }

        if (preData.images) {


            preData.images.forEach((img) => {
                if (fs.existsSync(path.join(__dirname, `uploads/${img}`))) {
                    fs.unlinkSync(path.join(__dirname, `uploads/${img}`));
                }
            });

        }

        const response = await users.deleteOne({_id : new mongodb.ObjectId( req.params.id )});
        res.status(200).json({ message: 'success', data: response });
}
    catch (error) {
    console.log(error);
    res.status(500).json({ message: 'internal server error' });
}
});

app.listen(5200, () => {
    console.log('server is running on port 5200');
});


// (()=>{
//     console.log(`${req.procol}`);
// })()