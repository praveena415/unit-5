const mongoose =require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  isActive: { type: Boolean, default: true }
}
)

const courseModel = mongoose.model("Courses",courseSchema);
module.exports = courseModel;