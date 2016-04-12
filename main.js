const net = require('net');
var user = require('./user/user.js');
const db = require('mysql');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
this.id=0;
const server = net.createServer((c) => {
        console.log("client with id=",this.id," connected");
        this.id++;
c.on('end', () => { console.log('client disconnected');});
c.on('error',(err)=>console.log(err.toString()));
        var client = new user.Client(c,this.id);
c.write('hello!');
});
server.on('error',()=>{console.log(err);});
server.listen(11000,()=>{console.log('server bound');});
const http=require('http');
var httpSrv=http.createServer((request,response)=>{
        if (request.method==='GET')
        {
                var query = querystring.parse(request.url);
              //  console.log(request.arguments);
                console.log(query);//

                response.writeHead(200, {'Content-Type': 'text/html'});
                var jade = require('jade');
                jade.renderFile('./views/index.jade', {
                        options: 'here'
                }, function (err, html) {
                        response.end(html);
                });

                //response.write(this.date);

        }
        else{
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.end('Hello World\n');
        }

});
httpSrv.listen(8080, 'localhost');
httpSrv.on('clientError',(exception,socket)=>{
        console.log(exception);
        socket.write('smth went wrong!');
});
httpSrv.on('close',()=>{
        console.log('server is closed');
});
httpSrv.on('connect',(request,socket,head)=>{
        console.log('connection is established');
        console.log(request);
        socket.write('connection is established!');
});
console.log('Server running at http://localhost:8080/');