import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Train = () => {
  const [trains, setTrains] = useState([]);
  const [formData, setFormData] = useState({
    train_name: '',
    capacity: '',
    source_station: '',
    destination_station: '',
  });

  useEffect(() => {
    fetchAllTrains();
  }, []);

  const fetchAllTrains = () => {
    axios.get('http://localhost:5000/train')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.log('Error fetching trains:', error);
      });
  };

  const addTrain = () => {
    axios.post('http://localhost:5000/train/create', formData)
      .then(response => {
        setTrains([...trains, response.data]);
        setFormData({
          train_name: '',
          capacity: '',
          source_station: '',
          destination_station: '',
        });
        fetchAllTrains();
      })
      .catch(error => {
        console.log('Error adding train:', error);
      });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Trains</h2>
      <form onSubmit={addTrain}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Train Name" name="train_name" value={formData.train_name} onChange={handleFormChange} />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" placeholder="Capacity" name="capacity" value={formData.capacity} onChange={handleFormChange} />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Source Station" name="source_station" value={formData.source_station} onChange={handleFormChange} />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Destination Station" name="destination_station" value={formData.destination_station} onChange={handleFormChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Train</button>
      </form>
      <ul className="list-group mt-4">
        {trains.map(train => (
          <li key={train._id} className="list-group-item">
            Train Name: {train.train_name}<br />
            Capacity: {train.capacity}<br />
            Source: {train.source_station}<br />
            Destination: {train.destination_station}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Train;
