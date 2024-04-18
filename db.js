const mongoose= require('mongoose')
const url = `mongodb://localhost:27017`

const connectToMongo =  async()=>{
    await mongoose.connect(url)
    console.log("connected to database sucessfully")
}

module.exports = connectToMongo