const net = require('net');
var mysql = require('mysql');
function Client(socket,id){
    this.model = require('../models/UserModel.js');
    this.id=id;
    this.socket = socket;
    this.message ="";
    this.socket.on('data',(data)=>{
         this.message+= data.toString();
      // console.log(this.parse(this.message));
        if (this.message.indexOf('}')>0)
        {
            //console.log(this.message);


           // console.log(this.protocol(this.message)[0]);
            var parsed = this.protocol(this.message);
            if (parsed.type==='sql')
            this.activeConnection(parsed.method,parsed.params,this.socket);
           //socket.write(this.activeConnection('select','id=1'));
            this.message='';
        }
    });
    this.parser = function (data) {
       var protocol=JSON.parse(data);
        console.log(protocol['method']);
        return protocol['method'];
    };

    this.protocol = (socketMessage)=>{
        var fields=JSON.parse(socketMessage);
        var method=fields['method'];
        var model=fields['model'];
        var action=fields['action'];
        var params=fields['params'];
        var type = fields['type'];
        return {
            method:method,
            params:params,
            action:action,
            model:model,
            type:type
        };
        //console.log(fields['method']);
        //if (fields.indexOf('method')!=0)
         //   console.log(fields['method']);
    }



}
exports.Client = Client;
