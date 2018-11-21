var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";
var dbName = "student";

// 创建一个模块
module.exports = {
    // 然后给里面的login对象弄一个方法
    login: function (req, res, name, pwd) {
        // mongoClient构建数据库
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if (err) {
                console.log("加载数据库失败");
                return false;
            }
            // 取得要操作的表
            var loginTable = data.db(dbName).collection("user");
            // 用前台传过来的账号密码查找数据库里是否有这个数据
            loginTable.find({"name": name}, {"passworld": pwd}).toArray(function (err, ress) {
                if (err) {
                    console.log("loginTable查询地方出错");
                    return false;
                }
                // 当查找的值返回为真的话,那么就执行下面的登录动作
                if (ress.length > 0) {
                    // 判断用户的权限，T1为管理员,T2为普通用户
                    console.log(ress[0].huiyuan);
                    res.send({"msg": "登录成功","yonghu":ress[0]._id});
                } else {
                    req.session.info = false;
                    res.send({"msg": "失败"});
                }
            })
        })
    },
    register: function (req, res, name, pwd) {
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if (err) {
                console.log("加载数据库失败");
                return false;
            }
            // 取得要操作的表
            var loginTable = data.db(dbName).collection("user");
            // 用前台传过来的账号密码查找数据库里是否有这个数据
            loginTable.find({"name": name}).toArray(function (err, ress) {
                if (err) {
                    console.log("loginTable查询地方出错");
                    return false;
                }
                // 当查找的值返回为真的话,那么就执行下面的登录动作
                if (ress.length > 0) {
                    // 判断用户在数据库里面有没有，如果没有就注册，有就返回失败;
                    res.send({"start":"100",msg: "已有用户"})
                } else {
                    loginTable.insertOne({"name":name,"passworld":pwd,"touxiang":"null","huiyuan":"T2"},function (err,data){
                       if(err){
                           console.log("莫名的失败");
                           return false;
                       }
                       res.send({"start":"200","msg":"注册成功"});
                    })
                }
            })
        })
    }
}