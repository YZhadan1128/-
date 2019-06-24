const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express();


//使用body-parser 中间件解析post数据
app.use(bodyParser.urlencoded({
    extended: false,
}))


//使用模板引擎
app.set("view engine","ejs")


//模块不同,处理不同路由
//处理后台
app.use("/admin",require("./routers/admin.js"))

//处理注册登录
app.use("/api",require("./routers/api.js"))

//处理前台
app.use("/main",require("./routers/main.js"))


//为public目录下文件设置路由
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/musicpage",{useNewUrlParser:true},(err)=>{
    if(err){
        console.log("连接失败");
        return
    }
    console.log("连接成功")
})
app.listen(5000,()=>{
    console.log("监听开始");
})