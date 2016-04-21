var mysql = require('mysql');
var Protocol = require('../utils/Protocol.js');
function activeConnection(protocol,socket){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'Cjcbgbcmre1',
        database : 'iim'
    });
    connection.connect();
    if (protocol.method =='SELECT')
    connection.query(protocol.method + '* from '+ protocol.model+' WHERE '+ params,function(err, rows, fields) {
        if (err) console.log(err.stack);
        socket.write(JSON.stringify(rows));
    });
    if (protocol.method =='INSERT')
        connection.query(protocol.method + ' into '+ protocol.model+' set '+ params,function(err, rows, fields) {
            if (err) console.log(err.stack);
            socket.write(JSON.stringify(rows));
        });
    if (protocol.method =='DELETE')
        connection.query(protocol.method + ' from '+ protocol.model+' WHERE '+ params,function(err, rows, fields) {
            if (err) console.log(err.stack);
            socket.write(JSON.stringify(rows));
        });
    if (protocol.method =='UPDATE')
        connection.query(protocol.method + protocol.model+' WHERE '+ params,function(err, rows, fields) {
            if (err) console.log(err.stack);
            socket.write(JSON.stringify(rows));
        });
    connection.end();
}
exports.dbConnect = activeConnection;