var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";
var dbName = "student";
var ObjectID = require('mongodb').ObjectID;
var a=1;


module.exports={
    gouwu:function (req,res,shangpinID,yonghuID) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if(err){
                console.log("前台连接数据库失败");
                return false
            }
            var tianjiaTable=data.db(dbName).collection("student");
            // 查询返回全部
            tianjiaTable.find({"shangpinID":shangpinID}).toArray(function (err,rel) {
                if(err){
                    console.log("查询失败");
                }
                console.log("有没有"+rel.length);
                if(rel.length>0){
                    tianjiaTable.updateOne({"yonghuID":yonghuID,"shangpinID":shangpinID},{$set:{shuliang:parseInt(rel[0].shuliang+1)}},function (err,resa) {
                        if(err){
                            console.log("修改失败");
                            return false;
                        }
                        res.send({"start":"200","msg":"成功"});
                    })
                }else{
                    tianjiaTable.insertOne({"yonghuID":yonghuID,"shangpinID":shangpinID,shuliang:parseInt(a)},function (err,relute) {
                        if(err){
                            console.log("添加失败");
                            return false;
                        }
                        res.send({"start":"200","msg":"成功"});
                    })
                }
            })


        })
    },
    gouwuche:function (req,res,yonghu) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if(err){
                console.log("前台连接数据库失败");
                return false;
            }
            var pagingTable=data.db(dbName).collection("student");
            var chaxunTable=data.db(dbName).collection("commodity");
            // 查询返回全部
            pagingTable.find({"yonghuID":yonghu}).toArray(function (err,rea) {
                if(err){
                    console.log("查询失败");
                    return false;
                }
                if(rea.length>0){
                    console.log("用户"+rea[0].yonghuID+"购物车长度是"+rea.length);
                test(rea,data,function (neirong) {
                    res.send({"start":"200","msg":"成功","data":neirong});
                    console.log("返回成功");
                })
                }
                else{
                    res.send({"start":"300","msg":"你的购物车没有商品"});
                }
            })
        })
    },
    delet:function (req,res,shangpinID) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if(err){
                console.log("前台连接数据库失败");
                return false;
            }
            var pagingTable=data.db(dbName).collection("student");
            // 查询返回全部
            pagingTable.deleteOne({"_id":ObjectID(shangpinID)},function (err,relute) {
                if(err){
                    console.log("删除失败");
                    return false;
                }
                console.log(shangpinID);
                console.log(relute);
                res.send({"start":"200","msg":"删除成功"})
            })
        })
    },
    gaibian:function (req,res,shangpinID,fuhao) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true},function (err,data) {
            if(err){
                console.log("添加连接数据库失败");
                return false;
            }
            var pagingTable=data.db(dbName).collection("student");
            var shangpinTable=data.db(dbName).collection("commodity");
            console.log(shangpinID);
            pagingTable.find({"_id":ObjectID(shangpinID)}).toArray(function (err,rea) {
                console.log(rea);
                if(rea.length>0){
                    if(fuhao=="+"){
                        pagingTable.updateOne({"_id":ObjectID(shangpinID)},{$set:{"shuliang":parseInt(rea[0].shuliang+1)}},function (err,relute) {
                            if(err){
                                return false
                            }
                            res.send({"msg":"成功"});
                        })
                    }else if(fuhao=="-"){
                        pagingTable.updateOne({"_id":ObjectID(shangpinID)},{$set:{"shuliang":parseInt(rea[0].shuliang-1)}},function (err,relute) {
                            if(err){
                                return false
                            }
                            res.send({"msg":"成功"});
                        })
                    }
                }else{
                    res.send({"msg":"失败"});
                }
            })
        })
    },
    jiesuan:function (req,res,shangpinID) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true},function (err,data) {
            if(err){
                console.log("结算连接数据库失败");
                return false;
            }
            var pagingTable=data.db(dbName).collection("student");
            var dingdanTable=data.db(dbName).collection("dingdan");
            jiesuan(shangpinID,data,function (ress) {
                if(ress.length>0){
                  for(var i=0;i<ress.length;i++){
                      pagingTable.deleteOne({"_id":ObjectID(ress[i]._id)},function (err,data) {
                          if(err) {
                              console.log("删除数据库连接失败");
                              return false;
                          }
                      })
                      dingdanTable.insertMany(ress,function (err,data) {
                          if(err) {
                              console.log("添加成功");
                              return false;
                          }
                          res.send({"msg":"成功"});
                      })
                  }
                }else{
                    res.send({msg:"失败"});
                }
            });
        })
    }
}
function test(id,data,callback){
    var resultObj=[];//
    //匿名自执行函数
    (function getNextData(i){
        //什么时候结束执行
        if(i==id.length){//循环结束 2-1
            callback(resultObj);//把最后得到的数据返回给调用者
            return;
        }
        console.log("传进来的ID是"+id[i].shangpinID);
        var a=id[i].shangpinID;
        console.log(a);
        var chaxunTable=data.db(dbName).collection("commodity");
        // 查询返回全部
        chaxunTable.find({"_id":ObjectID(a)}).toArray(function (err,neirong) {
            neirong[0].liang=id[i].shuliang;
            neirong[0].shangpinID=id[i]._id;
            resultObj.push(neirong[0]);
            i++;//i
            getNextData(i);
        })
    })(0);
}
function jiesuan(id,data,callback){
    var resultObj=[];//
    //匿名自执行函数
    console.log("数据");
    (function getNextDataA(i){
        //什么时候结束执行
        if(i==id.length){//循环结束 2-1
            callback(resultObj);//把最后得到的数据返回给调用者
            return;
        }
        console.log("传进来的ID是"+id[i].shangpinID);
        var a=id[i];
        console.log("条件是"+id[i]);
        var chaxunTable=data.db(dbName).collection("student");
        // 查询返回全部
        chaxunTable.find({"_id":ObjectID(a)}).toArray(function (err,neirong) {
            neirong[0].zhuangtai="待发货";
            resultObj.push(neirong[0]);
            i++;//i
            getNextDataA(i);
        })
    })(0);
}