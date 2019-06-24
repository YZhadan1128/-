const express = require("express")

const router = express.Router();

//router 子服务  注册
router.get("/user",(req,res)=>{
    res.send("/api - user")
})

module.exports = router