const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

connectToMongo()

// Available Routes
app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
})

app.listen(port, () => {
    console.log(`I notebook listening on http://localhost:${port}`);
})