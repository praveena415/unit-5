const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connetced to db")
    } catch (error) {
        console.log(err)
    }
    module.exports = connectDB
}