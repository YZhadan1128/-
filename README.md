# 音乐网站设计使用文档  

## 前台

 首先前台页面分为六个部分 (1) 头部 ; (2) 二级导航栏 ; (3) 版块1:  轮播图(使用swiper完成,swiper是一款JQuery的衍射插件) ; (4) 版块2: 歌单 ; (5)  侧边栏的小人 (6) 底部内容: 通常用于写明备案号以及其他内容

#### 工具准备

1. 编译器,推荐使用webstorm
2. nodejs,淘宝在使用的高并发的后台语言俗称版本帝 2009年5月发布 使用v8引擎
3. MongoDB,一款数据库,在这里用于账号数据的存储
4. MongoDB Compass 一款数据可视化软件,可以查看数据

#### 前台部分代码展示

```html
<!doctype html> <!--前台主要代码-->
<html>
	<head>
		<meta charset='utf-8'>
		<title>云村音乐</title>
		<meta name='keywords' content=''>
		<meta name='description' content=''>
		<style>
			body,p,h1,h2,h3,h4,ul{
				margin: 0;
			}
			ul{
				padding: 0;
				list-style: none;
			}
			img{
				display: block;
			}
			input{
				outline: none;
			}
			table{
				border-collapse: collapse;
			}
			table,th,table td{
				padding: 0;
			}
			/* 样式初始化默认配置*/
		</style>
	</head>
	<body>
		<header id="backtop"></header> <!--头部内容,搜索以及注册登录-->
    	 <nav></nav>  <!--二级菜单栏-->
         <section id="current"></section> <!-- 轮播部分 -->
         <section id="musiclist"></section> <!-- 歌单部分 -->
         <aside></aside> <!-- 侧边人 -->
         <footer></footer> <!-- 底部内容 -->
         <script></script> <!-- 回到顶部功能 -->
	</body>
</html>
```



前台页面主要是用HTML5的部分标签和CSS完成;

## 后台  

后台分为两个部分;

一个是对于网易云音乐api的使用

一个是账号注册的使用

网易云api获取歌曲资源需要用到nodejs的几个框架 express mongoose body-parse 等 原生nodejs过于繁琐,请求服务都不方便,所以使用了框架;

账号注册主要就是连接数据库这些都有写在注释中了

#### 后台部分代码展示  

```javascript
//需要用到Ajax和 Vuex 这里是api的使用
const search = Vue.component("search", {
    template: `<div>  
      <p class="search">搜索页面</p>
      <input @keyup.enter="sousuo" type="text" v-model="search" placeholder="按下回车搜索" required>
      <ul>
        <li @click="getsrc(item)" v-for="(item, index) in serList">
          {{ index + 1 }} . {{ item.name }} --- {{ item.artists[0].name }}
        </li>
      </ul>
    </div>`, //vuex组件 
    data() {  //返回的数据
      return {
        search: "",
        serList: []
      }
    },
    computed: {
      ...Vuex.mapState(["audio", "detail"])
      
    },
    methods: {
      sousuo() {
        const self = this;
        $.ajax({ //jq 的ajax
            
          url: `https://api.wulv5.com/music/search?keywords=${this.search}`, //网易云API
          success: function ({result: {songs}}) {
            // console.log(songs);
            self.serList = songs
          }
        })
      },
      ...Vuex.mapMutations(["play"]),
      getsrc(item) {
        this.play(item);
        this.$store.state.detail = item;
      }
    }
  });
  // 歌曲详情页
  const detail = Vue.component("detail", {
    template: 
        `<div>
            <p class="all">默认歌曲详情页</p>
            <img :src="detail.song.album.picUrl" width="200" height="200" alt="">
                <p class="name">{{ detail.song.album.name }}</p>
        </div>`,
    computed: {
      ...Vuex.mapState(["detail"]) //vuex
      
    }
  });
  new Vue({ //Vue框架 一款渐进式框架 尤雨溪开发
    el: "#app",
    store,
    data: {
      list: []
    },
    created() {
      const self = this;
    //   console.log(self)
      $.ajax({
        url: "https://api.wulv5.com/music/personalized/newsong",
        success: function ({result}) {
        //   console.log(this);
          self.list = result
        //   console.log({result})
        }
      })
    },
    methods: {
      ...Vuex.mapMutations(["play"]),
      getsrc(item) {
        this.play(item);
        this.$store.state.detail = item;
      }
    },
    computed: {
      ...Vuex.mapState(["audio", "detail"])
    },
    components: {
      detail,
      search
    }
  })
 //下面是登录注册的部分代码
  
//连接数据库
var mongoose = require("mongoose");   //需要提前使用npm安装mongodb

var url = "mongodb://127.0.0.1:27017/musicpage";   //mongo是我的数据库
var db = mongoose.connect(url);                     //连接数据库
//注册

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({ //定义数据模型
    name: String,
    pwd: String

});
mongoose.model('u2', UserSchema);
//保存到mongodb中

//登录

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

```

### 使用



首先打开webstorm 

打开musicpage文件目录

使用web自带的cmd 使用命令npm init -y 初始化服务 并且用 npm install express mongoose body-parse --save 下载所需框架

进入app.js文件 邮件 run app.js 启动api服务

然后 进入login.js 中 邮件run login.js 启动注册登录的服务

由于没有用pug或者ejs模板所以需要分两次启动,并且主页中状态没有更新;

然后再chrome浏览器中输入 localhost:5000 回车访问