import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    date_res: '',
    no_of_reservations: '',
  });

  useEffect(() => {
    fetchAllReservations();
  }, []);

  const fetchAllReservations = () => {
    axios.get('http://localhost:5000/reservation')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.log('Error fetching reservations:', error);
      });
  };

  const addReservation = () => {
    axios.post('http://localhost:5000/reservation/create', formData)
      .then(response => {
        setReservations([...reservations, response.data]);
        setFormData({
          date_res: '',
          no_of_reservations: '',
        });
        fetchAllReservations();
      })
      .catch(error => {
        console.log('Error adding reservation:', error);
      });
  };

  const deleteReservation = (id) => {
    axios.delete(`http://localhost:5000/reservation/${id}`)
      .then(() => {
        setReservations(reservations.filter(reservation => reservation._id !== id));
      })
      .catch(error => {
        console.log('Error deleting reservation:', error);
      });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Reservations</h2>
      <form onSubmit={addReservation}>
        <div className="mb-3">
          <input type="datetime-local" className="form-control" name="date_res" value={formData.date_res} onChange={handleFormChange} />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" placeholder="Number of Reservations" name="no_of_reservations" value={formData.no_of_reservations} onChange={handleFormChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Reservation</button>
      </form>
      <ul className="list-group mt-4">
        {reservations.map(reservation => (
          <li key={reservation._id} className="list-group-item">
            Date: {reservation.date_res}<br />
            Number of Reservations: {reservation.no_of_reservations}
            <button className="btn btn-danger ms-2" onClick={() => deleteReservation(reservation._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservation;
