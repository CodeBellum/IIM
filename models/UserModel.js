const net = require('net');
var dbConnection = require('../utils/DbConnection.js');
var protocol = require('../utils/Protocol.js');
function User(socket){
    this.id=0;
    this.password ="";
    this.login="";
    this.name="";
    this.info="";
    this.rights=0;
    this.socket = socket;
    this.message ="";
   // this.socket.on('data',(data)=>{
   //     this.message+= data.toString();
//   //     if (this.message.indexOf('<end>')>0)
   //     {
   //         var parsed = protocol.Protocol(this.message.substr(0,this.message.indexOf('<end>')-1));
   //         if (parsed.type==='sql')
   //             dbConnection.dbConnect(parsed,this.socket);
   //         this.message='';
   //     }
   // });
    this.Index = function(login,password)
    {
        var request = new protocol.ProtocolBuild().build();
        this.login = login;
        this.password = password;
        request.params['method']='SELECT';
        request.params['sql_params'] = '\'login\'= \''+login+'\' AND \'password\' = \''+password+'\'';
        request.params['table'] = 'user';
        request.type='sql';
        var errors =[];
        console.log('request');
        console.log(request);
        var response = dbConnection(request,errors);
        if (errors.length==0) {
            console.log(response);
            this.id = response.data[0]['id'];
            this.login = response.data[0]['login'];
            this.password = response.data[0]['password'];
            this.name = response.data[0]['name'];
            this.info = response.data[0]['info'];
            this.rights = response.data[0]['rights'];
            response.params['status']=200;
            console.log(response);
            socket.write(response.build());
        }
        else {
            response.data=errors;
            response.params['status']=400;
            console.log(response);
            socket.write(response.build());
        }

    }
}
exports.User = User;