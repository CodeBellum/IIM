const net = require('net');
var dbConnection = require('../DbConnection.js');
var protocol = require('../utils/Protocol.js');
function User(socket){
    this.id=0;
    this.name="";
    this.socket = socket;
    this.message ="";
    this.View = function(sqlparams)    {
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='SELECT';
        request.params['sql_params'] = sqlparams;
        request.params['table'] = 'user';
        request.type='sql';
        var errors =[];
      //  console.log('request');
      //  console.log(request);
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
        //    console.log(response);
            socket.write(JSON.stringify(response)+'<end>');
        });
    };
    this.Index = function(){
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='SELECT';
        request.params['sql_params'] = {};
        request.params['table'] = 'user';
        request.type='sql';
        var errors =[];
       // console.log('request');
       // console.log(request);
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
         //   console.log(response);
            socket.write(JSON.stringify(response)+'<end>');
        });
    };
    this.Add = function(sqlparams){
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='INSERT';
        request.params['sql_params'] = sqlparams;
        request.params['table'] = 'user';
        request.type='sql';
        var errors =[];
       // console.log('request');
      //  console.log(request);
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
         //   console.log(response);
            socket.write(JSON.stringify(response)+'<end>');
        });
    };
    this.Update = function(sqlparams,sqlvalues){
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='UPDATE';
        request.params['sql_params'] = sqlparams;
        request.params['sql_values'] = sqlvalues;
        request.params['table'] = 'user';
        request.type='sql';
        var errors =[];
       // console.log('request');
       // console.log(request);
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
         //   console.log(response);
            socket.write(JSON.stringify(response)+'<end>');
        });
    };
    this.Delete = function(sqlparams){
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='DELETE';
        request.params['sql_params'] = sqlparams;
        request.params['table'] = 'user';
        request.type='sql';
        var errors =[];
     //   console.log('request');
     //   console.log(request);
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
      //      console.log(response);
            socket.write(JSON.stringify(response)+'<end>');
        });
    }
}
function UserHTTP(){
    this.View = function(res,sqlparams,render)    {
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='SELECT';
        request.params['sql_params'] = sqlparams;
        request.params['table'] = 'user';
        request.type='sql';
        var errors =[];
       // console.log('request');
        dbConnection(request,errors,function(rows){
            if (rows.length>0)
            {
                res.status=200;
                if(!render)
                res.redirect('/lk/'+rows[0].id);
                else
                res.render('lk',{fields:rows[0]});
            }
            else
            {
                res.status=404;
                res.render('404');
            }
         //   console.log(res);
        });
    };
    this.Index = function(res){
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='SELECT';
        request.params['sql_params'] = {};
        request.params['table'] = 'user';
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
    this.Add = function(res,sqlparams){
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='INSERT';
        request.params['sql_params'] = sqlparams;
        request.params['table'] = 'user';
        request.type='sql';
        var errors =[];
       // console.log('request');
       // console.log(request);
        dbConnection(request,errors,function(rows){
            if (rows.length>0)
            {
                res.status=200;
                res.send('Регистрация прошла успешно!\r\n Войдите в личный кабинет используя логин и пароль, указанные при регистрации');
                res.redirect('/');
            }
            else
            {
                res.status=404;
                res.send('Пользователь с таким логином уже существует!');
                res.redirect('/register');
            }
           // console.log(res);
        });
    };
    this.Update = function(res,sqlparams,sqlvalues){
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='UPDATE';
        request.params['sql_params'] = sqlparams;
        request.params['sql_values'] = sqlvalues;
        request.params['table'] = 'user';
        request.type='sql';
        var errors =[];
       // console.log('request');
       // console.log(request);
        dbConnection(request,errors,function(rows){
            if (rows.length>0)
            {
                res.status=200;
                res.send('Обновление прошло успешно!');
                res.redirect('/');
            }
            else
            {
                res.status=404;
                res.redirect('/register');
                res.send('Обновление не прошло!');
            }
        });
    };
    this.Delete = function(res,sqlparams){
        var request = new protocol.ProtocolBuild().build();
        request.params['method']='DELETE';
        request.params['sql_params'] = sqlparams;
        request.params['table'] = 'user';
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
    }
}
exports.User = User;
exports.UserHTTP = UserHTTP;