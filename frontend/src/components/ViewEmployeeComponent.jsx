import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios'
import { EMPLOYEE_API_BASE_URL } from '../services/rootServices';

const ViewEmployeeComponent = () => {
  const [employee, setEmployee] = useState({});
  const { param_data } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
    try {
        
      const response = await axios.get(`${EMPLOYEE_API_BASE_URL}/employees/${param_data}`);
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    };
    
    fetchEmployee();
  }, [param_data]);

  return (
    <div>
      <br />
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center">View Employee Details</h3>
        <div className="card-body">
          <div className="row">
            <label>Employee First Name:</label>
            <div>{employee.firstName}</div>
          </div>
          <div className="row">
            <label>Employee Last Name:</label>
            <div>{employee.lastName}</div>
          </div>
          <div className="row">
            <label>Employee Email ID:</label>
            <div>{employee.emailId}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeComponent;
