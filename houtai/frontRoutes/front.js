var express = require('express');
var router = express.Router();
var multer=require("multer");
var date=require("../public/javascripts/shangpinData.js");
var url=require("url");
var tianjia=require("./js/gouwuche.js");
var bodyParser = require('body-parser');
var shangcheng=require("./js/shangpinData.js")


router.get('/', function(req, res, next) {
    console.log("进入取得商品");
    shangcheng.front(req,res);
});
router.get('/tianjia', function(req,res,next) {
    var shangpinID=url.parse(req.url,true).query.shangpinID;
    var yonghuID=url.parse(req.url,true).query.yonghuID;
    console.log(shangpinID+"..."+yonghuID);
    console.log("进入添加操作");
    tianjia.gouwu(req,res,shangpinID,yonghuID);
});
router.get('/gouwuche', function(req,res,next) {
    var yonghuID=url.parse(req.url,true).query.yonghuID;
    console.log("进入购物车返回");
    tianjia.gouwuche(req,res,yonghuID);
});
router.get('/gouwudelete', function(req,res,next) {
    var shangpinID=url.parse(req.url,true).query.shangpinID;
    tianjia.delet(req,res,shangpinID);
});
router.get('/shulianggaibian', function(req,res,next) {
    var shangpinID=url.parse(req.url,true).query.shangpinID;
    var fuhao=url.parse(req.url,true).query.jiahuojian;
    console.log(fuhao);
    console.log("进入购物车返回");
    tianjia.gaibian(req,res,shangpinID,fuhao);
});
router.get('/jiesuan', function(req,res,next) {
    var shangpinID=url.parse(req.url,true).query.id;
    var neirong=shangpinID.split("%");
    console.log(neirong)
    tianjia.jiesuan(req,res,neirong);
});
module.exports = router;

