const express = require('express');

const app = express();

app.get('/read-data', (req, res)=>{
    res.send('hello everyone');
});

app.get('/insert-data', (req, res)=>{
    res.send('insert route');
});

app.post('/log-in', (req, res)=>{
    res.status(402).json({ meassge: 'logged in'})
});

app.listen(5200, ()=>{ console.log('server is running on port 5200') });