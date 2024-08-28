const express = require('express');
const path = require('path');

const app = express();

const filePath = path.join(__dirname, 'public');

app.use(express.static(filePath));

app.get('/', (req, res)=>{
    res.sendFile(`${filePath}/home.html`);
});

app.get('/contact', (req, res)=>{
    res.sendFile(`${filePath}/contact.html`);
});

app.listen(4200, ()=>{
    console.log("Server is running on port 4200");
});