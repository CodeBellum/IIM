const net = require('net');
var dbConnection = require('../DbConnection.js');
var protocol = require('../utils/Protocol.js');
var knex = require('knex');
function Receiver(socket){
    this.id=0;
    this.name="";
    this.socket = socket;
    this.message ="";
    this.View = function view(sqlparams) {
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='SELECT';
        request.params['sql_params'] = sqlparams;
        request.params['table'] = 'recievers';
        request.type='sql';
        var errors =[];
        console.log('request');
        console.log(request);
        dbConnection(request,errors,function(rows){
            var response = new protocol.ProtocolBuild().build();
            response.data=rows;
            if (rows.length>0)
            {
                response.params=[{status:200}];
            }
            else
            {
                response.params=[{status:400}];
            }
            console.log(response);
            socket.write(JSON.stringify(response)+'<end>');
        });
    };
    this.Index = function(sqlparams){
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='SELECT';
        request.params['sql_params'] = sqlparams;
        request.params['table'] = 'recievers';
        request.type='sql';
        var errors =[];
        console.log('request');
        console.log(request);
        dbConnection(request,errors,function(rows){
            var response = new protocol.ProtocolBuild().build();
            response.data=rows;
            if (rows.length>0)
            {
                response.params=[{status:200}];
            }
            else
            {
                response.params=[{status:400}];
            }
            console.log(response);
            socket.write(JSON.stringify(response)+'<end>');
        });
    };
    this.Add = function(sqlparams){
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='INSERT';
        request.params['sql_params'] = sqlparams;
        request.params['table'] = 'messages';
        request.type='sql';
        var errors =[];
        console.log('request');
        console.log(request);
        dbConnection(request,errors,function(rows,returning){
            var response = new protocol.ProtocolBuild().build();
            console.log(rows);
            console.log(returning);
            response.data=rows;
            if (rows.length>0)
            {
                response.params=[{status:200}];
            }
            else
            {
                response.params=[{status:400}];
            }
            console.log(response);
            socket.write(JSON.stringify(response)+'<end>');
        });
    };
}
exports.Receiver = Receiver;