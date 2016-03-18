const net = require('net');
function Client(socket,id){
    this.id=id;
    this.socket = socket;
    this.message ="";
    this.socket.on('data',(data)=>{
         this.message+= data.toString();
       console.log(this.parse(this.message));
        if (this.message.length>5)
        {
            console.log(this.message);
            this.message="";
        }
});

    this.parse = function (data) {
        if (data.indexOf('123')!=0)
        return 'yeah';

    }
}
exports.Client = Client;
