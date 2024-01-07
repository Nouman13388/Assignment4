import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ticket = () => {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    trainId: '',
    price: '',
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    axios.get('http://localhost:5000/ticket')
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => {
        console.log('Error fetching tickets:', error);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/ticket/create', formData)
      .then(response => {
        setTickets([...tickets, response.data]);
        setFormData({
          trainId: '',
          price: '',
        });
      })
      .catch(error => {
        console.log('Error adding ticket:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/ticket/${id}`)
      .then(() => {
        setTickets(tickets.filter(ticket => ticket._id !== id));
      })
      .catch(error => {
        console.log('Error deleting ticket:', error);
      });
  };

  const handleGetAllTickets = () => {
    fetchTickets();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tickets</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label">Train ID:</label>
          <input type="text" className="form-control" name="trainId" value={formData.trainId} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Ticket</button>
        <button type="button" className="btn btn-success ms-2" onClick={handleGetAllTickets}>Get All Tickets</button>
      </form>
      <ul className="list-group mt-4">
        {tickets.map(ticket => (
          <li key={ticket._id} className="list-group-item d-flex justify-content-between align-items-center">
            Train ID: {ticket.trainId} - Price: {ticket.price}
            <button className="btn btn-danger" onClick={() => handleDelete(ticket._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ticket;
