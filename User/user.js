const net = require('net');
var mysql = require('mysql');
var userModel = require('../models/UserModel.js');
var proto = require('../utils/Protocol.js');
function Client(socket,id){
    this.model = new userModel.User(socket);
    this.id=id;
    this.socket = socket;
    this.message ="";
  this.socket.on('data',(data)=>{
       this.message+= data.toString();
        console.log(this.message);
      if (this.message.indexOf('<end>')>0)
      {
          var parsed = proto.Protocol(this.message.substr(0,this.message.indexOf('<end>')));
          console.log(parsed);
          if (parsed.type==='sql')
            switch (parsed.params['action'])
            {
                case 'index': {
                    this.model.Index(parsed.params['login'],parsed.params['password'])
                }break;
            }

         //socket.write(this.activeConnection('select','id=1'));
          this.message='';
      }
  });
}
exports.Client = Client;
