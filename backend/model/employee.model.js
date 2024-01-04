const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  cont_no: { type: String, unique: true },
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
