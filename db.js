const mongoose = require('mongoose');
const url = `mongodb://127.0.0.1:27017/inotebook`;


const connectToMongo = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

module.exports = connectToMongo;
