const mongoose = require("mongoose");

let studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  rollno: {
    type: Number,
  }
});

module.exports = mongoose.model("Student", studentSchema);