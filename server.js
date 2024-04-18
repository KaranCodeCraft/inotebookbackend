const connectToM = require('./db')
const express = require('express')
connectToM()

const app = express()
const port = 5000

app.get('/',(req,res)=>{
    res.send("hello World")
})

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
})