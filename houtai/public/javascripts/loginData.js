var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";
var dbName = "student";

// 创建一个模块
module.exports={
    // 然后给里面的login对象弄一个方法
    login:function (req,res,name,pwd) {
        // mongoClient构建数据库
        MongoClient.connect(dbUrl, {useNewUrlParser: true}, function (err, data) {
            if(err){
                console.log("加载数据库失败");
                return false;
            }
            // 取得要操作的表
           var loginTable=data.db(dbName).collection("user");
            // 用前台传过来的账号密码查找数据库里是否有这个数据
            loginTable.find({"name":name},{"passworld":pwd}).toArray(function (err,ress) {
                if(err){
                    console.log("loginTable查询地方出错");
                    return false;
                }
                // 当查找的值返回为真的话,那么就执行下面的登录动作
                if(ress.length>0){
                    // 判断用户的权限，T1为管理员,T2为普通用户
                    if(ress[0].authority=="T1"){
                        req.session.is_login=true;
                        req.session.rank="T1";
                        req.session.name=ress[0].name;
                        req.session.touxiang=ress[0].touxiang;
                        console.log("设置成功");
                    }else if(ress[0].authority=="T2"){
                        req.session.is_login=true;
                        req.session.rank="T2";
                        req.session.name=ress[0].name;
                        req.session.touxiang=ress[0].touxiang;
                    }
                    console.log("执行登录返回");
                    res.send({"msg":"200",data:"成功"});
                }else{
                    res.send("<script language=javascript>alert('登录失败,请仔细想想你的账号密码');window.location.href='/users'</script>");
                }
            })
        })
    }
}