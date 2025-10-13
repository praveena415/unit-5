const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
	title:String,
	description:String,status:String,dueDate:Date
})


const todoModel = mongoose.model("Todo",todoSchema);
module.exports = todoModel