const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
 employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
 },
 customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
 },
 ticketId: {
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