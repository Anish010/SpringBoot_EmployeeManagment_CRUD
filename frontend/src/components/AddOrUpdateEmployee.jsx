import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EMPLOYEE_API_BASE_URL } from "../services/rootServices";
import axios from "axios";

const AddOrUpdateEmployee = () => {
  const { param_data } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  let navigate = useNavigate();

    const getEmployees = async () => {
    try {
        
      const response = await axios.get(`${EMPLOYEE_API_BASE_URL}/employees/${param_data}`);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmailId(response.data.emailId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    console.log(param_data);
    if (param_data === "_add") {
      return;
    } else {
      getEmployees();
    }
  }, [param_data]);

  const saveOrUpdateEmployee = async (e) => {
    e.preventDefault();
    let jsonData = { firstName, lastName, emailId };
    jsonData = JSON.stringify(jsonData);
    console.log(jsonData);

    if (param_data === "_add") {
      try {
        const response = await axios.post(
          `${EMPLOYEE_API_BASE_URL}/addEmployees`,
          jsonData,
          {
            headers: {
              "Content-Type": "application/json", // Add this line to set the content type
            },
          }
        );
        console.log(response);
        navigate("/");
      } catch (error) {
        console.error("Error saving employee:", error);
        
      }
    } else {
      try {
        const response = await axios.put(
          `${EMPLOYEE_API_BASE_URL}/updateEmployees/${param_data}`,
          jsonData,
          {
            headers: {
              "Content-Type": "application/json", // Add this line to set the content type
            },
          }
        );
        console.log(response);
        navigate("/");
      } catch (error) {
        console.error("Error saving employee:", error);
        
      }
    }
  };





  const cancel = () => {
    navigate("/");
  };

  const getTitle = () => {
    return param_data === "_add" ? (
      <h3 className="text-center">Add Employee</h3>
    ) : (
      <h3 className="text-center">Update Employee</h3>
    );
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {getTitle()}
            <div className="card-body">
              <form onSubmit={saveOrUpdateEmployee}> 
                <div className="form-group">
                  <label> First Name: </label>
                  <input
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={firstName || ""}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label> Last Name: </label>
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName || ""}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label> Email Id: </label>
                  <input
                    placeholder="Email Address"
                    name="emailId"
                    className="form-control"
                    value={emailId || ""}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={saveOrUpdateEmployee}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={cancel}
                  style={{ marginLeft: "10px" }}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrUpdateEmployee;
