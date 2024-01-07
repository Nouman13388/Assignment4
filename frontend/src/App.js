import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Employee from './components/Employee';
import Customer from './components/Customer';
import Ticket from './components/Ticket';
import Reservation from './components/Reservation';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
