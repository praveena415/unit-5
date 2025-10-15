const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title:String,
    summery:String,
    genres:String,
    copies:Number 
})
const Book = mongoose.model("Book",bookSchema)
module.exports = Book