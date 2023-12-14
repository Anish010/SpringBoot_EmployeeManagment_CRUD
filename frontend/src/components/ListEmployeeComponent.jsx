import React, { useState, useEffect } from 'react';
// import EmployeeService from '../services/EmployeeService';
import { EMPLOYEE_API_BASE_URL } from '../services/rootServices';
import {useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.js';




const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([])
  const navigate = useNavigate();
  


      useEffect(() => {
    // Use Axios to fetch data
    axios.get(`${EMPLOYEE_API_BASE_URL}/employees`)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      }, []);
  
  const addEmployee = () => {
    navigate("/employees/_add")
  } 

  const editEmployee = (id) => {
    navigate(`/employees/${id}`)
  }
  const viewEmployee = (id) => {
    navigate(`/view-employees/${id}`)
  }

  const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(
          `${EMPLOYEE_API_BASE_URL}/deleteEmployees/${id}`
        );
        console.log(response);
      window.location.reload();
      } catch (error) {
        console.error("Error saving employee:", error);
        
      }
  }
    
  return (
    <div>
      <h2 className="text-center">Employees List</h2>
      <div className="row">
        <button className="btn btn-primary"  onClick={addEmployee}>
          Add Employee
        </button>
      </div>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Employee First Name</th>
              <th> Employee Last Name</th>
              <th> Employee Email Id</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td> {employee.firstName} </td>
                <td> {employee.lastName}</td>
                <td> {employee.emailId}</td>
                <td>
                  <button
                    onClick={() => editEmployee(employee.id)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: '10px' }}
                    onClick={() => deleteEmployee(employee.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    style={{ marginLeft: '10px' }}
                    onClick={() => viewEmployee(employee.id)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListEmployeeComponent