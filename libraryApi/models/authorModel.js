const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
    name:String,
    age:Number,
    email:String
})
const Author = mongoose.model("Author",authorSchema)
module.exports = Author