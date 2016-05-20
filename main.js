const net = require('net');
var user = require('./user/user.js');
const db = require('mysql');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
var mysql = require('mysql');
this.id=0;
const server = net.createServer((c) => {
        console.log("client with id=",this.id," connected");
        this.id++;
c.on('end', () => { console.log('client disconnected');});
c.on('error',(err)=>console.log(err.toString()));
        var client = new user.Client(c,this.id);
});
server.on('error',()=>{console.log(err);});
server.listen(11000,()=>{console.log('server bound');});
const express=require('express');
const path = require('path');
var bodyParser = require('body-parser');
var app = express();
var favicon = require('serve-favicon');
app.use(bodyParser());
app.use(favicon(__dirname + '/public/images/favicon.ico'));
console.log(path.join(__dirname,'public','images','favicon.ico').toString());
app.set('views', './views');
app.route('/errors/:id')
    .get(function(req, res) {
            if (req.params.id==404)
            res.render('404');
            if (req.params.id==500)
                    res.render('500');
    })
    .post(function(req, res) {
            res.send('Add a book');
    })
    .put(function(req, res) {
            res.send('Update the book');
    });
app.route('/')
    .get(function(req, res) {
        res.render('index',{messages:['test','my','app']});
    })
    .post(require('./routes/lk').post)
    .put(require('./routes/lk').put);
app.route('/lk/:id')
    .get(require('./routes/lk').get)
    .post(require('./routes/lk').post)
    .put(require('./routes/lk').put);
app.route('/register')
    .get(function(req, res) {
        res.render('register');
    })
    .post(require('./routes/register').post)
    .put(function(req, res) {
        res.send('Update the book');
    });
app.set('title','Ivaaan IM');
app.set('view engine', 'jade');
app.listen(8080);
console.log('Server running at http://localhost:8080/');