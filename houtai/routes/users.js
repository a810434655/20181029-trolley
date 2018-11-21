var express = require('express');
var router = express.Router();
var multer=require("multer");
var date=require("../public/javascripts/ReadThePicture.js");
var url=require("url");
var bodyParser = require('body-parser');
var logino=require("../public/javascripts/loginData");
router.get('/', function(req, res, next) {
    res.render("login");
});
router.get('/login', function(req, res, next) {
    // 取得前台传过来的值,然后这里是处理登录的,所以说取得账号和密码
    var urlParameter=url.parse(req.url,true).query;
    var name=urlParameter.userName;
    var pwd=urlParameter.pwd;
    console.log(urlParameter);
    console.log("参数是是"+"用户名:"+name+"密码:"+pwd);
    var ge="get";
    logino.login(req,res,name,pwd);
});
router.post("/login",function (req,res,next) {
   var name=req.body.userName;
   var pwd=req.body.pwd;
    logino.login(req,res,name,pwd);
})



module.exports = router;
