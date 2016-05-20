var userModel = require('../models/UserModel.js');
var messageModel = require('../models/MessageModel.js');
var receiverModel = require('../models/ReceiverModel.js');
function checkAuth(req,res)
{
    var user = new userModel.UserHTTP();
    user.View(res,{login:req.body.login,password:req.body.password},false);
}
function updateUser(req,res)
{
    var user = new userModel.UserHTTP();
    user.Update(res,{id:req.params.id},{login:req.body.login,password:req.body.password,info:res.body.info,name:res.body.name,id:res.body.id});
}
function showUser(req,res,render)
{
    var user = new userModel.UserHTTP();
    user.View(res,{id:req.params.id},render);
}
exports.get=function(req,res){
    if(req.params.id>0)
    {
        showUser(req,res,true);
    }
    else
    {
        res.redirect('/errors/404');
    }
};
exports.post=function(req,res,next){
    console.log(req.body);
    if (req.body.enter!==undefined)
    checkAuth(req,res);
    else
    {
        res.redirect('/register');
    }
};
exports.put=function(req,res,next){
    console.log(req.body);
        updateUser(req,res);

};
