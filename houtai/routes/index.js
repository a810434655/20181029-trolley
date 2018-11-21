var express = require('express');
var router = express.Router();
var url=require("url");
var biaoge=require("../public/javascripts/shangpinData");
var deletea=require("../public/javascripts/deletData");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("<script language=javascript>window.location.href='/index'</script>")
});
router.get('/index', function(req, res, next) {
    var canshu=url.parse(req.url,true).query;
    var yema=canshu.yema;
    var tiaojian=canshu.tiaojian;
    console.log("条件是"+tiaojian+"页码是"+yema);
    if(yema==undefined){
        yema=0;
    }
    if(tiaojian=="" || tiaojian=="no"){
        tiaojian==undefined;
        console.log("进入条件设置"+tiaojian);
}
    if(tiaojian==undefined || tiaojian=="no"){
        biaoge.quanbu(req,res,yema);
    }else{
        console.log("开始搜索");
        biaoge.chaxun(req,res,yema,tiaojian);
    }
});
router.get('/index/tuichu', function(req, res, next) {
    console.log("进入退出操作,销毁本地存储状态");
    req.session.destroy();
    res.send("<script language=javascript>alert('退出成功');window.location.href='/users'</script>")
});
router.get('/index/delet', function(req, res, next) {
    var canshu=url.parse(req.url,true).query;
    var tiaojian=canshu.tiaojian;
    deletea.deleted(req,res,tiaojian);
});


module.exports = router;
