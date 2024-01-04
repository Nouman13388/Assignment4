const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  cont_no: { type: String, unique: true },
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
