const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	name:String,
	email:String,
	isActive:{type:Boolean,default:true}
})

const studentModel = mongoose.model("Students",studentSchema);
module.exports = studentModel;