var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";
var dbName = "student";

module.exports={
    quanbu:function(req,res,page,tiaojian) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if(err){
                console.log("分页连接数据库失败");
                return false;
            }
            // 连接表
            var pagingTable=data.db(dbName).collection("commodity");
            pagingTable.find().count(function (erra,neirong){
                if (erra) {
                    console.log("总数错误");
                    return false;
                }
                // 得到商品的总数
                var yeshu=Math.ceil(neirong/10);
                console.log("总页数是"+yeshu);
                // 查询返回全部
                pagingTable.find().skip(page*10).limit(10).toArray(function (erro,rulte) {
                    if (erro) {
                        console.log(err);
                        return false;
                    }
                    console.log(rulte[0].tubiao);
                    // 返回查询到的数据和总页数
                    var name=req.session.name;
                    var touxiang=req.session.touxiang
                    res.render('index', {title:name,data: rulte,yeshu:yeshu,tiaojian:"no","liebiao":0,"touxiang":touxiang});
                })
            })
        })
    },
    chaxun:function (req,res,page,tiaojian) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if(err){
                console.log("分页连接数据库失败");
                return false;
            }
            // 连接表
            var pagingTable=data.db(dbName).collection("commodity");
            pagingTable.find({"name":tiaojian}).count(function (erra,neirong){
                if (erra) {
                    console.log("总数错误");
                    return false;
                }
                // 得到商品的总数
                var yeshu=Math.ceil(neirong/10);
                console.log("总页数是"+yeshu);
                // 查询返回全部
                pagingTable.find({"name":tiaojian}).skip(page*10).limit(10).toArray(function (erro,rulte) {
                    if (erro) {
                        console.log(err);
                        return false;
                    }
                    console.log(rulte);
                    // 返回查询到的数据和总页数
                    var name=req.session.name;
                    console.log("搜索完毕");
                    var touxiang=req.session.touxiang
                    res.render('index', {title:name,data: rulte,yeshu:yeshu,tiaojian:tiaojian,"liebiao":0,"touxiang":touxiang});
                })
            })
        })
    },
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
                    res.send({"data":rulte});
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