function closure(request,errors){
    var mysql = require('mysql');
    var Protocol = require('../utils/Protocol.js');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'Cjcbgbcmre1',
        database : 'iim'
    });
    console.log(mysql);
    connection.connect();
    connection.ping(function (err) {
        if (err) throw err;
        console.log('Server responded to ping');
    });
    function activeConnection(request,errors){
        this.response = new Protocol.ProtocolBuild().build();
        console.log('try ping from func');
        connection.ping(function (err) {
            if (err) throw err;
            console.log('Server responded to ping');
        });
        console.log(request.type);
        if (request.type==='sql') {
            this.response.params['model'] = request.params['table'];
            console.log(request.params['method']);
            console.log(request.params['method'] + ' * from ' + request.params['table'] + ' WHERE ' + request.params['sql_params']);
            if (request.params['method'] == 'SELECT')
            { connection.query(request.params['method'] + ' * from ' + request.params['table'] + ' WHERE ' + request.params['sql_params'], function (err, rows, fields) {
                console.log(rows);
                console.log(err.stack);
                console.log(fields);
                console.log('aaaa');
                if (err) errors=err.stack;
                else response.data = JSON.stringify(rows);
            });
                console.log("select");
            }
            if (request.params['method'] == 'INSERT')
                this.connection.query(request.params['method'] + ' into ' + request.params['table'] + ' set ' + request.params['sql_params'], function (err, rows, fields) {
                    if (err) errors=err.stack;
                    else response.data = JSON.stringify(rows);
                });
            if (request.params['method'] == 'DELETE')
                this.connection.query(request.params['method'] + ' from ' + request.params['table'] + ' WHERE ' + request.params['sql_params'], function (err, rows, fields) {
                    if (err) errors=err.stack;
                    else response.data = JSON.stringify(rows);
                });
            if (request.params['method'] == 'UPDATE')
                connection.query(request.params['method'] + request.params['table'] + ' WHERE ' + request.params['sql_params'], function (err, rows, fields) {
                    if (err) errors=err.stack;
                    else response.data = JSON.stringify(rows);
                });
        }
        return {resp:this.response};
    }
    return activeConnection(request,errors);
}

module.exports = closure;