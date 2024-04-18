const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send("hello tis is auth")
})

module.exports = router 