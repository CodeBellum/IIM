var userModel = require('../models/UserModel.js');
var messageModel = require('../models/MessageModel.js');
var receiverModel = require('../models/ReceiverModel.js');
function AddUser(req,res)
{
    var user = new userModel.UserHTTP();
    user.Add(res,req.body);
}
exports.get=function(req,res){
    console.log('lk get');
};
exports.post=function(req,res,next){
    console.log(req.body);
        AddUser(req,res);

};
