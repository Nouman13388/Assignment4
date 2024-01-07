import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    gender: '',
    cont_no: '',
  });

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = () => {
    axios.get('http://localhost:5000/employee')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.log('Error fetching employees:', error);
      });
  };

  const addEmployee = () => {
    axios.post('http://localhost:5000/employee/create', formData)
      .then(response => {
        setEmployees([...employees, response.data]);
        setFormData({
          fName: '',
          lName: '',
          gender: '',
          cont_no: '',
        });
        fetchAllEmployees();
      })
      .catch(error => {
        console.log('Error adding employee:', error);
      });
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/employee/${id}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee._id !== id));
      })
      .catch(error => {
        console.log('Error deleting employee:', error);
      });
  };

  const editEmployee = (id) => {
    const newContactNo = prompt('Enter new contact number:');
    if (newContactNo !== null) {
      axios.patch(`http://localhost:5000/employee/${id}`, { cont_no: newContactNo })
        .then(() => {
          fetchAllEmployees();
        })
        .catch(error => {
          console.log('Error updating contact number:', error);
        });
    }
  };
  

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Employees</h2>
      <form onSubmit={addEmployee}>
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
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
      <ul className="list-group mt-4">
        {employees.map(employee => (
          <li key={employee._id} className="list-group-item d-flex justify-content-between align-items-center">
            {employee.fName} {employee.lName} - {employee.gender} - {employee.cont_no}
            <button className="btn btn-danger me-2" onClick={() => deleteEmployee(employee._id)}>Delete</button>
            <button className="btn btn-warning" onClick={() => editEmployee(employee._id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employee;
