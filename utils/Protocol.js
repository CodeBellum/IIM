function Protocol (socketMessage){
    var fields=JSON.parse(socketMessage);
    var params = fields['params'];
    var type = fields['type'];
    var data = fields['data'];
   // var token = fields['token'];
    return {
        params:params,
        type:type,
        data:data
    };
}
function ProtocolConstruction(){
    this.params=[];
    this.type="";
    this.data="";
    this.build = ()=>
    {
        return {
            params:this.params,
            type:this.type,
            data:this.data
        };
    }
}
exports.Protocol = Protocol;
exports.ProtocolBuild = ProtocolConstruction;