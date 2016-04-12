const net = require('net');
var mysql = require('mysql');
function User(socket,id){
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
    this.activeConnection = function(method,params,socket){
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'Cjcbgbcmre1',
            database : 'iim'
        });
        connection.connect();
        connection.query(method + '* from user WHERE '+ params,function(err, rows, fields) {
            if (err) console.log(err.stack);
            socket.write(JSON.stringify(rows[0]));
        });
        connection.end();
        //return resultMessage['id'];
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
exports.IndexAction = User;