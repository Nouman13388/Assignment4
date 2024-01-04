const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  train_name: { type: String, required: true },
  capacity: { type: Number, required: true, min: 50, max: 300 },
  source_station: { type: String, required: true },
  destination_station: { type: String, required: true },
});

const Train = mongoose.model('Train', trainSchema);
module.exports = Train;
