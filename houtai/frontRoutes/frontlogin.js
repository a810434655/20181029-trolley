var express = require('express');
var router = express.Router();
var multer=require("multer");
var url=require("url");
var bodyParser = require('body-parser');
var login=require("./js/login");
var touxiang=require("./js/chaxuntouxiang");
router.get('/', function(req, res, next) {
    var name=url.parse(req.url,true).query.userName;
    var pwd=url.parse(req.url,true).query.pwd;
    login.login(req,res,name,pwd);
});
router.get('/register', function(req, res, next) {
    var name=url.parse(req.url,true).query.userName;
    var pwd=url.parse(req.url,true).query.pwd;
    login.register(req,res,name,pwd);
});


router.get('/uplode', function(req, res, next) {
    console.log("没有进入");
    var tiaojian=url.parse(req.url,true).query.touxiang;
    console.log("用户"+tiaojian+"的头像");
    touxiang.chaxun(req,res,tiaojian);
});
module.exports = router;
