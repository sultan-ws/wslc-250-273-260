const express = require('express');
const path = require('path');

const app = express();

const filePath = path.join(__dirname, 'public');
app.use(express.static(filePath));

app.get('/', ( req, res ) => {
    res.sendFile(`${filePath}/index.html`)
});

app.get('/aboutus', ( req, res ) => {
    res.sendFile(`${filePath}/aboutus.html`)
});

app.get('/courses', ( req, res ) => {
    res.sendFile(`${filePath}/courses.html`)
});

app.get('/gallery', ( req, res ) => {
    res.sendFile(`${filePath}/gallery.html`)
});

app.get('/enquiry', ( req, res ) => {
    res.sendFile(`${filePath}/enquiry.html`)
});

app.get('/contactus', ( req, res ) => {
    res.sendFile(`${filePath}/contactus.html`)
});

app.get('/*', (req,res)=>{
    res.sendFile(`${filePath}/404.html`)
});

app.listen(4800, ()=>{
    console.log('Server is running on port 4800');
})