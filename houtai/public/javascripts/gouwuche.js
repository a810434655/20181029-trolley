var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";
var dbName = "student";
var ObjectID = require('mongodb').ObjectID;
module.exports={
    gouwu:function (req,res,tiaojian) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if(err){
                console.log("前台连接数据库失败");
                return false;
            }
            var pagingTable=data.db(dbName).collection("commodity");
            var tianjiaTable=data.db(dbName).collection("student");
            // 查询返回全部
            pagingTable.find({"_id":ObjectID(tiaojian)}).toArray(function (err,ok) {
                if(err){
                    console.log("shibai");
                    return false;
                }
                tianjiaTable.insertOne({"title":ok[0].title,"jiage":ok[0].jiage,"tubiao":ok[0].tubiao},function (err,chengong) {
                    if(err){
                        console.log("失败");
                        return false;
                    }
                    res.send("成功");
                })
            })
        })
    },
    goumai:function (req,res,tiaojian) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if(err){
                console.log("前台连接数据库失败");
                return false;
            }
            var pagingTable=data.db(dbName).collection("student");
            var tianjiaTable=data.db(dbName).collection("dingdan");
            // 查询返回全部
            pagingTable.find({"_id":ObjectID(tiaojian)}).toArray(function (err,ok) {
                if(err){
                    console.log("shibai");
                    return false;
                }
                tianjiaTable.insertOne({"title":ok[0].title,"jiage":ok[0].jiage,"tubiao":ok[0].tubiao},function (err,chengong) {
                    if(err){
                        console.log("失败");
                        return false;
                    }
                    res.send("成功");
                })
            })
        })
    }
}