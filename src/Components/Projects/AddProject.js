import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddProject = () => {
  const history = useNavigate();
  const [Tasks, setTasks] = useState("");
  const [Values, setValues] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
  });
  const [users, setUsers] = useState([]);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = Values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  useEffect(() => {
    getUsers();
    getTasks();
  }, []);
  const UserCreateHandler = async (e) => {
    e.preventDefault();
    const userDatails = {
      ...Values,
    };
    const data = localStorage.getItem("user");
    console.log(data);
    try {
      const result = await axios.post(
        `http://localhost:6400/projects/newproject`,
        userDatails
        // { mode: "cors" }
      );
      console.log(result);
      alert("Project Created Successfully");
      setValues({});
      history("/viewproject");
    } catch (err) {
      console.log(err);
    }
  };
  const getUsers = async (e) => {
    // e.preventDefault();
    const userDatails = {
      ...Values,
    };
    try {
      const result = await axios.get(
        `http://localhost:6400/users`,
        userDatails
      );
      console.log(result.data?.data);
      setUsers(result.data?.data);

      //   alert("user created successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const getTasks = async (e) => {
    // e.preventDefault();
    const userDatails = {
      ...Values,
    };
    try {
      const result = await axios.get(
        `http://localhost:6400/tasks`,
        userDatails
      );
      console.log(result);

      //   alert("user created successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ margin: "40px" }}>
      <h1>ADD PROJECT</h1>
      <div className="container">
        <form
          className="contact-us-form"
          onSubmit={UserCreateHandler}
          style={{ padding: "20px" }}
        >
          <div className="col-md-12">
            <div className="row">
              <label className="col-sm-3 col-form-label">
                Project Name <span className="require-icon">*</span>
              </label>
              <div className="col-sm-3 col-form-label">
                <input
                  label="Task Name"
                  size="small"
                  type="text"
                  fullwidth
                  name="projectName"
                  variant="outlined"
                  value={Values.projectName}
                  onChange={(e) => onChangeHandler(e)}
                  required
                  autoFocus
                />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <label className="col-sm-3 col-form-label">
                Start Date <span className="require-icon">*</span>
              </label>
              <div className="col-sm-3 col-form-label">
                <input
                  label="Start Date"
                  size="small"
                  type="date"
                  fullwidth
                  name="startDate"
                  variant="outlined"
                  value={Values.startDate}
                  onChange={(e) => onChangeHandler(e)}
                  required
                  autoFocus
                />
              </div>
              {/* <span id="user-error">{errEmail}</span> */}
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <label className="col-sm-3 col-form-label">
                End Date <span className="require-icon">*</span>
              </label>
              <div className="col-sm-3 col-form-label">
                <input
                  label="End Date"
                  size="small"
                  type="date"
                  fullwidth
                  name="endDate"
                  variant="outlined"
                  value={Values.endDate}
                  onChange={(e) => onChangeHandler(e)}
                  required
                  autoFocus
                />
              </div>
            </div>
          </div>

          <div
            className="col-md-12 contact-us-form-group"
            style={{ padding: "20px" }}
          >
            <div className="row">
              <div className="col-8 contact-us-form-group">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
