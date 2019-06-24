const express = require("express")

const router = express.Router();

//router 子服务  后台
router.get("/user",(req,res)=>{
    res.send("/admin - user")
})

module.exports = router