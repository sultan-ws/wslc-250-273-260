const http = require('http');
const data = require('./support');

http.createServer((req, res)=>{

    try{

        console.log(req.url);

       if(req.method === 'GET' && req.url === '/read-data'){
        res.writeHead(200, {'content-type' : 'application/json'});
        res.write(JSON.stringify(data));
        res.end();
       } else if(req.method === 'POST'){
        res.writeHead(200, {'content-type' : 'application/json'});
        res.write(JSON.stringify({message: 'post request'}));
        res.end();
       } if(req.method === 'GET' && req.url === '/insert-data'){
        res.end('insert route')
       }

       
    }
    catch(error){
        console.log(error);

        res.writeHead(500, {'content-type' : 'application/json'});
        res.write(JSON.stringify({message:'internal server error'}))
        res.end();
    }
    
}).listen(4800, ()=>{
    console.log('server is running on port 4800');
});

// headers