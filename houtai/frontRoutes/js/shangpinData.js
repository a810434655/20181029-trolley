var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";
var dbName = "student";

module.exports={
    front:function (req,res) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if(err){
                console.log("前台连接数据库失败");
                return false;
            }
            var pagingTable=data.db(dbName).collection("commodity");
            // 查询返回全部
            pagingTable.find().toArray(function (erro,rulte) {
                if (erro) {
                    console.log(err);
                    return false;
                }
                // console.log(rulte[0].tubiao);
                // 返回查询到的数据和总页数
                res.send({"start":"200","msg":"成功","data":rulte,"zhuangtai":req.session.info});
            })
        })
    },
    gouwuche:function (req,res) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if(err){
                console.log("前台连接数据库失败");
                return false;
            }
            var pagingTable=data.db(dbName).collection("student");
            // 查询返回全部
            pagingTable.find().toArray(function (erro,rulte) {
                if (erro) {
                    console.log(err);
                    return false;
                }
                console.log(rulte[0].tubiao);
                // 返回查询到的数据和总页数
                res.send({"data":rulte});
            })
        })
    },

}