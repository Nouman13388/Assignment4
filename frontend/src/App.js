import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Employee from './components/Employee';
import Customer from './components/Customer';
import Ticket from './components/Ticket';
import Reservation from './components/Reservation';
import Navbar from './components/Navbar';
import Train from './components/Train';

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
          <Route path="/train" element={<Train />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
