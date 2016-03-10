const net = require('net');
var user = require('./user/user.js');

const server = net.createServer((c) => {
        console.log('cleint connected');
c.on('end', () => { console.log('client disconnected');});
c.on('error',(err)=>console.log(err.toString()));
c.write('hello!');
c.pipe(user.createNewClient(c));
});
server.on('error',()=>{throw err;});
server.listen(11000,()=>{console.log('server bound');});