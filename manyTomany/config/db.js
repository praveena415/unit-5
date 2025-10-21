
const mongoose = require("mongoose");

const connectToDB = async()=>{
	try{
		await mongoose.connect("mongodb://127.0.0.1:27017/EnrollmentData")
		console.log("Connected to Enrollment database");
	}
	catch(err){
		console.log("Something error in database connection",err);
	}
}

module.exports = connectToDB;