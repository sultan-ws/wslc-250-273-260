// https://www.npmjs.com/search?q=mongodb
const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbname = 'temp_db_test';

const client = new MongoClient(url);

const config = async()=>{
    await client.connect();
    const db = client.db(dbname);

    return db;
};


//insert single data

const insertOneData = async()=>{
    const db = await config();

    const users = db.collection('admin');

    const response = await users.insertOne(
        {
            name:'john',
            lastname:'wick',
            age: 30,
            conatct:'john@mail.com'
        }
    );

    console.log(response);
};


// insertOneData();

//insert many

const insertManyData = async()=>{
    const db = await config();

    const users = db.collection('user');

    const response = await users.insertMany(
       [ 
        
        {
            name:'john',
            lastname:'wick',
            age: 30,
            conatct:'john@mail.com'
        },
        {
            name:'janny',
            lastname:'wick',
            age: 30,
            conatct:'john@mail.com'
        },
        {
            name:'john',
            lastname:'wick',
            age: 30,
            conatct:'john@mail.com'
        },
        {
            name:'john',
            lastname:'wick',
            age: 30,
            conatct:'john@mail.com'
        }
    ]
    );

    console.log(response);
};

// insertManyData();

const readData = async()=>{
    const db = await config();

    const users = db.collection('admin');

    const response = await users.find().toArray();

    console.log(response);
};

readData();

const updateData = async()=>{
    const db = await config();

    const users = db.collection('users');

    const response = await users.updateOne(
        {
            name:'janny'
        },
        {
            $set:{age:22}
        }
    );

    console.log(response);
};

// updateData();


//delete data


const deletedata = async()=>{
    const db = await config();

    const users = db.collection('users');

    const response = await users.deleteOne(
        {
            name:'john'
        }
    )

    console.log(response);
};

// deletedata();