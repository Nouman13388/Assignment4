import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ticket = () => {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    t_depart: '',
    t_land: '',
    train: '',
    price: '',
  });

  useEffect(() => {
    fetchAllTickets();
  }, []);

  const fetchAllTickets = () => {
    axios.get('http://localhost:5000/ticket')
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => {
        console.log('Error fetching tickets:', error);
      });
  };

  const addTicket = () => {
    axios.post('http://localhost:5000/ticket/create', formData)
      .then(response => {
        setTickets([...tickets, response.data]);
        setFormData({
          t_depart: '',
          t_land: '',
          train: '',
          price: '',
        });
        fetchAllTickets();
      })
      .catch(error => {
        console.log('Error adding ticket:', error);
      });
  };

  const deleteTicket = (id) => {
    axios.delete(`http://localhost:5000/ticket/${id}`)
      .then(() => {
        setTickets(tickets.filter(ticket => ticket._id !== id));
      })
      .catch(error => {
        console.log('Error deleting ticket:', error);
      });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Tickets</h2>
      <form onSubmit={addTicket}>
        <div className="mb-3">
          <input type="datetime-local" className="form-control" name="t_depart" value={formData.t_depart} onChange={handleFormChange} />
        </div>
        <div className="mb-3">
          <input type="datetime-local" className="form-control" name="t_land" value={formData.t_land} onChange={handleFormChange} />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Train ID" name="train" value={formData.train} onChange={handleFormChange} />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" placeholder="Price" name="price" value={formData.price} onChange={handleFormChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Ticket</button>
      </form>
      <ul className="list-group mt-4">
        {tickets.map(ticket => (
          <li key={ticket._id} className="list-group-item">
            Departure: {ticket.t_depart}<br />
            Landing: {ticket.t_land}<br />
            Train ID: {ticket.train}<br />
            Price: {ticket.price}
            <button className="btn btn-danger ms-2" onClick={() => deleteTicket(ticket._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ticket;
