var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";
var dbName = "student";
var a=0;
module.exports={
    chaxun:function (req,res,tiaojian) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
        if(err){
            console("查询地址错误");
            return false
        }
        var chaxunTable=data.db(dbName).collection("user");
         chaxunTable.find({"name":tiaojian}).toArray(function (err,result) {
             if(err){
                 console.log("查询失败,没有头像");
                 return false;
             }
             if(result.length>0){
                var touxiang=result[0].touxiang;
                console.log("头像路径是"+touxiang);
                a++;
                console.log("现在是第几次访问"+a);
                res.send({touxiang:touxiang});
             }
         })
        })
    }
}