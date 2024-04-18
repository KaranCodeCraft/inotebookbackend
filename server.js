const connectToM = require('./db')
const express = require('express')
connectToM()

const app = express()
const port = 5000


// Available Routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/',(req,res)=>{
    res.send("hello World")
})

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
})