const express = require("express")

const router = express.Router();

//router 子服务  前台
router.get("/",(req,res)=>{
    res.render("main/index")
})

module.exports = router