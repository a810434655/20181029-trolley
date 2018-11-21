var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入session模块
var session=require("express-session");
// 引入url模块
var url=require("url");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shuju = require('./frontRoutes/front');
var gouwu=require("./frontRoutes/gouwu");
var frontLogin=require("./frontRoutes/frontlogin");
var app = express();
//设置允许跨域访问该服务.
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("mysystem"));
// 设置session模块
app.use(session({
    secret:"mysystem",
    cookie:{maxAge:100000},
    rolling:true,
}));
// 这里是可以声明资源文件在哪里
app.use(express.static(path.join(__dirname, '')));
// 设置一个中间件拦截器阻挡没有登录而直接访问
// 前端分发路由
app.use("/front",shuju);
app.use("/gouwu",gouwu);
app.use("/login",frontLogin);

app.use(function (req,res,next) {
    var urldizhi=url.parse(req.url,true).pathname;
    console.log("访问地址"+urldizhi);
    console.log("现在状态是"+req.session.info);
    if(req.session.info){
        console.log("已经登录状态",req.session.info);
        next();
    }else if(urldizhi=="/users" || urldizhi=="/users/login" || urldizhi=="/users/login/uplode" || urldizhi=="/"){
        next();
        console.log("访问了后台");
    }else if(urldizhi=="/front" || urldizhi=="/front/tianjia" || urldizhi=="/front/gouwudelete" ||urldizhi=="/front/gouwuche" || urldizhi=="/login/register" ||urldizhi=="/login/uplode" || urldizhi=="/login"){
        next();
        console.log("进去了");
    }else{
        res.send("<script language=javascript>alert('请登录');window.location.href='/users';</script>")
    }
})

// 后端分发路由
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
