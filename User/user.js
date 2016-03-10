const net = require('net');
var user_name='';
var messagee = '';
function createNewClient(socket){
     socket.on('data',(data)=>{
         messagee+= data.toString();
});
    if (messagee.length>5)
        console.log(messagee.length);
    return socket;
}
exports.createNewClient = createNewClient;