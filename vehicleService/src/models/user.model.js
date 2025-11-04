const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password: String
})

const Customer = mongoose.model("Customer",customerSchema)
module.exports = Customer