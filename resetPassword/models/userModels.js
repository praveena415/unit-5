const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	name:String,
	email:{type:String,unique:true,required:true},
	password:{type:String,required:true}
})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;