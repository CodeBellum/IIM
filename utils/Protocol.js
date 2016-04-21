function Protocol (socketMessage)=>{
    var fields=JSON.parse(socketMessage);
    var method=fields['method'];
    var model=fields['model'];
    var action=fields['action'];
    var params=fields['params'];
    var type = fields['type'];
    return {
        method:method,
        params:params,
        action:action,
        model:model,
        type:type
    };
}
exports.Protocol = Protocol;