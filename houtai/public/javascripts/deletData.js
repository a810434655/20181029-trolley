var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";
var dbName = "student";
var ObjectID = require('mongodb').ObjectID;
module.exports={
    deleted:function (req,res,tiaojian) {
        // mongoClient构建数据库
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if(err){
                console.log("加载数据库失败");
                return false;
            }
            // 取得要操作的表
            var deleteTable=data.db(dbName).collection("commodity");
            console.log("条件是"+tiaojian);
            deleteTable.deleteOne({"_id":ObjectID(tiaojian)},function (erro,rulte) {
                if(err){
                    console.log("删除失败");
                    return false;
                }
                console.log(rulte);
                res.send("<script language=javascript>alert('删除成功');self.location=document.referrer;</script>")
            })

        })
    }
}