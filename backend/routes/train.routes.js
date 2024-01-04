const express = require('express');
const router = express.Router();
const Train = require('../model/train.model'); // Import the Train model

// Get all trains
router.get('/trains', async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific train by ID
router.get('/:id', async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.json(train);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a train
router.post('/create', async (req, res) => {
  const train = new Train({
    train_name: req.body.train_name,
    capacity: req.body.capacity,
    source_station: req.body.source_station,
    destination_station: req.body.destination_station,
  });

  try {
    const newTrain = await train.save();
    res.status(201).json(newTrain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a train by ID
router.patch('/:id', async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }

    train.train_name = req.body.train_name || train.train_name;
    train.capacity = req.body.capacity || train.capacity;
    train.source_station = req.body.source_station || train.source_station;
    train.destination_station = req.body.destination_station || train.destination_station;

    const updatedTrain = await train.save();
    res.json(updatedTrain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a train by ID
router.delete('/:id', async (req, res) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.json({ message: 'Train deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
