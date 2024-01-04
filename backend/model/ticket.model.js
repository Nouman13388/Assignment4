const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  t_depart: {
    type: Date,
    required: true
  },
  t_land: {
    type: Date,
    required: true
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Ticket', TicketSchema);
