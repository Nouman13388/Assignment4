  import React, { useState, useEffect } from 'react';
  import axios from 'axios';

  const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
      fName: '',
      lName: '',
      gender: '',
      cont_no: '',
    });
  
    useEffect(() => {
      fetchAllCustomers();
    }, []);
  
    const fetchAllCustomers = () => {
      axios.get('http://localhost:5000/customer')
        .then(response => {
          setCustomers(response.data);
        })
        .catch(error => {
          console.log('Error fetching customers:', error);
        });
    };
  
    const addCustomer = () => {
      axios.post('http://localhost:5000/customer/create', {
        fName: formData.fName,
        lName: formData.lName,
        gender: formData.gender,
        cont_no: formData.cont_no
      })
      .then(response => {
        setCustomers([...customers, response.data]);
        setFormData({
          fName: '',
          lName: '',
          gender: '',
          cont_no: '',
        });
        fetchAllCustomers();
      })
      .catch(error => {
        console.log('Error adding customer:', error);
      });
    };
  
    // eslint-disable-next-line no-unused-vars
    const handleFormSubmit = (e) => {
      e.preventDefault();
      addCustomer();
    };
  
    const handleFormChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const deleteCustomer = (id) => {
      axios.delete(`http://localhost:5000/customer/${id}`)
        .then(() => {
          setCustomers(customers.filter(customer => customer._id !== id));
        })
        .catch(error => {
          console.log('Error deleting customer:', error);
        });
    };
  
    const editCustomer = (id) => {
      const newContactNo = prompt('Enter new contact number:');
      if (newContactNo !== null) {
        axios.patch(`http://localhost:5000/customer/${id}`, { cont_no: newContactNo })
          .then(() => {
            fetchAllCustomers();
          })
          .catch(error => {
            console.log('Error updating contact number:', error);
          });
      }
    };

    return (
      <div className="container mt-5">
        <h2>Customers</h2>
        <form onSubmit={addCustomer}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="First Name" name="fName" value={formData.fName} onChange={handleFormChange} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Last Name" name="lName" value={formData.lName} onChange={handleFormChange} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Gender" name="gender" value={formData.gender} onChange={handleFormChange} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Contact Number" name="cont_no" value={formData.cont_no} onChange={handleFormChange} />
          </div>
          <button type="submit" className="btn btn-primary">Add Customer</button>
        </form>
        <ul className="list-group mt-4">
          {customers.map(customer => (
            <li key={customer._id} className="list-group-item d-flex justify-content-between align-items-center">
              {customer.fName} {customer.lName} - {customer.gender} - {customer.cont_no}
              <button className="btn btn-danger me-2" onClick={() => deleteCustomer(customer._id)}>Delete</button>
              <button className="btn btn-warning" onClick={() => editCustomer(customer._id)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default Customer;
