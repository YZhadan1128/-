
var  express=require('express');
var app=express();
var mongoose = require('mongoose');
require('./connect.js');
require('./model.js');
var User = mongoose.model('u2');  //User为model name
mongoose.Promise = global.Promise;  //为了避免警告的出现，因为mongoose的默认promise已经弃用了


/**
 * 配置登录视图
 */
app.get('/',function (req,res) {
    res.sendfile(__dirname + "/" + "login.html" );
})

/**
 * 处理登录逻辑
 */
app.get('/login',function (req,res) {
    var name=req.query.name;
    var pwd=req.query.pwd;
    User.findOne({name:name,pwd:pwd},function (error,result) {
        if (result==null)
        {
            res.sendfile(__dirname + "/" + "no.html" );
        }else
        {
            res.sendfile(__dirname + "/" + "ok.html" );
        }
    })
})
/**
 * 配置注册视图
 */
app.get('/register.html',function (req,res) {
    res.sendfile(__dirname+"/"+"register.html");
})
/**
 * 处理注册逻辑
 */
app.get('/register',function (req,res) {
    var  name=req.query.name;
    var pwd=req.query.pwd;
    var user=new User(
        {name:name,
            pwd:pwd
        }
    )
    user.save(function (err,result) {
        if (result==null) {
            res.sendfile(__dirname + "/" + "no.html" );
        } else {
            res.sendfile(__dirname + "/" + "register_OK.html" );
        }
    });

})

/**
 * 端口监听
 * @type {http.Server}
 */
var  server=app.listen(3030,function () {
    console.log("start");
})
