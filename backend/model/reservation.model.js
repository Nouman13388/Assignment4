const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  emp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  cust: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  date_res: {
    type: Date,
    required: true
  },
  no_of_reservations: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
