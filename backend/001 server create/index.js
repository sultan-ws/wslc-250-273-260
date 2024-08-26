const http = require('http');

http.createServer((request, response)=>{
    response.end('welcome to my server');
    console.log(http);
})
.listen(5000, ()=>{
    console.log('server is running on port 5000');
});