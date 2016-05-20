function closure(request,errors,callback){
    var mysql = require('mysql');
    var Protocol = require('./utils/Protocol.js');
    var knex = require('knex')({
        client: 'mysql',
        connection: {
            host     : 'localhost',
            user     : 'root',
            password : 'Cjcbgbcmre1',
            database : 'iim',
            charset : 'utf8_general_ci'
        },
        pool: {
            min: 0,
            max: 40
        }
    });
    console.log(mysql);


    function activeConnection(request,errors,callback) {
        this.response = new Protocol.ProtocolBuild().build();

        console.log(request.type);
        try {
            if (request.type === 'sql') {
                this.response.params['model'] = request.params['table'];
                if (request.params['method'] == 'SELECT') {
                    console.log('begin');
                    knex(request.params['table']).select().where(request.params['sql_params']).then(function (rows) {
                        callback(rows);
                    });
                }

                if (request.params['method'] == 'INSERT')
                    knex(request.params['table']).insert(request.params['sql_params']).returning('*').catch(function(err){callback([])}).then(function (rows, returning) {
                        callback(rows, returning);
                    });

                if (request.params['method'] == 'DELETE')
                    knex(request.params['table']).where(request.params['sql_params']).del().then(function (rows) {
                        callback(rows);
                    });

                if (request.params['method'] == 'UPDATE')
                    knex(request.params['table']).where(request.params['sql_params']).update(request.params['sql_values']).then(function (rows) {
                        callback(rows);
                    });
            }
        }
        catch (err) {
            callback([]);

        }
    }
    return activeConnection(request,errors,callback);}


module.exports = closure;