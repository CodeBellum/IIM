const net = require('net');
var mysql = require('mysql');
var userModel = require('../models/UserModel.js');
var messageModel = require('../models/MessageModel.js');
var receiverModel = require('../models/ReceiverModel.js');
var proto = require('../utils/Protocol.js');
function Client(socket,id) {
    this.model = new userModel.User(socket);
    this.messageModel = new messageModel.Message(socket);
    this.receiverModel = new receiverModel.Receiver(socket);
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
                    case 'send-message':
                    {
                        console.log('send-message');
                       //
                       // if (parsed.data!==undefined)
                       // {
                       //     console.log(parsed);
                       //     var fs = require('fs');
                       //     var path = require('path');
                       //     var mkdirSync = function (path) {
                       //         try {
                       //             fs.mkdirSync(path);
                       //         } catch(e) {
                       //             if ( e.code != 'EEXIST' ) console.log(e);
                       //         }
                       //     };
                       //     mkdirSync(path.join('files',parsed.params[0]['sql_params'].sender_id));
                       //     fs.writeFileSync('../files/'+parsed.params[0]['sql_params'].sender_id+'/'+parsed.params[0]['sql_params'].message_file,parsed.data[0]);
                       //     parsed.params[0]['sql_params'].message_file='/files/'+parsed.params[0]['sql_params'].sender_id+'/'+parsed.params[0]['sql_params'].message_file;
                       //     this.messageModel.Add(parsed.params[0]['sql_params']);
                       // }
                       // else*/
                        this.messageModel.Add(parsed.params[0]['sql_params'])
                    }
                        break;
                    case 'show-history':
                    {
                        console.log('show-history');
                        this.messageModel.Index(parsed.params[0]['sql_params']['sender'],parsed.params[0]['sql_params']['receiver'])
                    }
                        break;
                    case 'show-message':
                    {
                        console.log('show-message');
                        this.messageModel.View(parsed.params[0]['sql_params'])
                    }
                        break;
                    case 'get-receivers':
                    {
                        console.log('get-receivers');
                        this.receiverModel.Index(parsed.params[0]['sql_params'])
                    }
                        break;
                    case 'get-receiver':
                    {
                        console.log('get-receiver');
                        this.receiverModel.View(parsed.params[0]['sql_params'])
                    }
                        break;
                }
            this.message = '';
        }
    });
}
exports.Client = Client;
