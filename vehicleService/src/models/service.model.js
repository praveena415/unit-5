const mongoose = require("mongoose")
const bookingSchema = new mongoose.Schema({
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:"Customer"},
    carModel:String,
    serviceType:String,
    date:String,
    cost:Number 
})

const Booking = mongoose.model("Booking",bookingSchema)
module.exports =  Booking 