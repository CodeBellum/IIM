var mysql = require('mysql');
var Protocol = require('../utils/Protocol.js');
function activeConnection(request,errors){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'Cjcbgbcmre1',
        database : 'iim'
    });
    this.response = new Protocol.ProtocolBuild().build();
    connection.connect();
    console.log(request.type);
    if (request.type==='sql') {
        this.response.params['model'] = request.params['table'];
        if (request.method == 'SELECT')
        { connection.query(request.params['method'] + '* from ' + request.params['table'] + ' WHERE ' + request.params['sql_params'], function (err, rows, fields) {
                if (err) errors=err.stack;
                else response.data = JSON.stringify(rows);
            });
            console.log("select");
        }
        if (request.params['method'] == 'INSERT')
            connection.query(request.params['method'] + ' into ' + request.params['table'] + ' set ' + request.params['sql_params'], function (err, rows, fields) {
                if (err) errors=err.stack;
                else response.data = JSON.stringify(rows);
            });
        if (request.params['method'] == 'DELETE')
            connection.query(request.params['method'] + ' from ' + request.params['table'] + ' WHERE ' + request.params['sql_params'], function (err, rows, fields) {
                if (err) errors=err.stack;
                else response.data = JSON.stringify(rows);
            });
        if (request.params['method'] == 'UPDATE')
            connection.query(request.params['method'] + request.params['table'] + ' WHERE ' + request.params['sql_params'], function (err, rows, fields) {
                if (err) errors=err.stack;
                else response.data = JSON.stringify(rows);
            });
    }
    connection.end();
    return {resp:this.response};
}
exports.dbConnect = activeConnection;