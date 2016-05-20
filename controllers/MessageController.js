const net = require('net');
var mysql = require('mysql');
var userModel = require('../models/UserModel.js');
var proto = require('../utils/Protocol.js');
function Message(socket,id) {
    this.model = new userModel.User(socket);
    this.id = id;
    this.socket = socket;
    this.message = "";
    this.socket.on('data', (data)=> {
        this.message += data.toString();
        console.log(this.message);
        if (this.message.indexOf('<end>') > 0) {
            var parsed = proto.Protocol(this.message.substr(0, this.message.indexOf('<end>')));
            console.log(parsed);
            if (parsed.type === 'sql')
                switch (parsed.params[0]['action']) {
                    case 'view':
                    {
                        console.log('view');
                        this.model.View(parsed.params[0]['sql_params'])
                    }
                        break;
                    case 'index':
                    {
                        console.log('index');
                        this.model.Index(parsed.params[0]['sql_params'])
                    }
                        break;
                    case 'add':
                    {
                        console.log('add');
                        this.model.Add(parsed.params[0]['sql_params'])
                    }
                        break;
                    case 'update':
                    {
                        console.log('update');
                        this.model.Update(parsed.params[0]['sql_params'], parsed.params[0]['sql_values'])
                    }
                        break;
                    case 'delete':
                    {
                        console.log('delete');
                        this.model.Delete(parsed.params[0]['sql_params'])
                    }
                        break;
                }
            this.message = '';
        }
    });
}
exports.Message = Message;
