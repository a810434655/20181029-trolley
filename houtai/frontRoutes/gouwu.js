var express = require('express');
var router = express.Router();
var multer=require("multer");
var url=require("url");
var tianjia=require("./js/gouwuche.js");
var bodyParser = require('body-parser');
var chaxuntouxiang=require("./js/chaxuntouxiang");

router.get('/',function(req, res, next) {
    console.log("进入取得商品");
    date.front(req,res);
});
router.get('/goumai', function(req,res,next) {
    var id=url.parse(req.url,true).query.id;
    tianjia.goumai(req,res,id);
});
module.exports = router;
