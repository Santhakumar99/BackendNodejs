import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddTask = () => {
  const history = useNavigate();
  const [Tasks, setTasks] = useState("");
  const [Values, setValues] = useState({
    taskname: "",
    assignedTo: "",
    // status: "",
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
        `http://localhost:6400/tasks/newtask`,
        userDatails
        // { mode: "cors" }
        // {
        //   headers: {
        //     authorization:
        //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWRiZGRmMGFmYjY5YWVkYTEzYTJlZDkiLCJVc2VyTmFtZSI6IlJTSyIsIkVtYWlsIjoic2FuZHlzYW52aTQ3QGdtYWlsLmNvbSIsImlhdCI6MTY0MTg5MzQ2Nn0.DwXkPvVB9MENQvtJJyjUBDWDfYhk_79gbxELf2n-9XU",
        //   },
        // }
      );
      console.log(result);
      alert("task created successfully");
      setValues({});
      history("/viewtask");
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
      <h1>Tasks</h1>
      <div className="container">
        <form
          className="contact-us-form"
          onSubmit={UserCreateHandler}
          style={{ padding: "20px" }}
        >
          <div className="col-md-12">
            <div className="row">
              <label className="col-sm-3 col-form-label">
                Task Name <span className="require-icon">*</span>
              </label>
              <div className="col-sm-3 col-form-label">
                <input
                  label="Task Name"
                  size="small"
                  type="text"
                  fullwidth
                  name="taskname"
                  variant="outlined"
                  value={Values.taskname}
                  onChange={(e) => onChangeHandler(e)}
                  required
                  autoFocus
                />
              </div>
            </div>
            {/* <span id="user-error">{errEmail}</span> */}
          </div>
          <div className="col-md-12">
            <div className="row">
              <label className="col-sm-3 col-form-label">
                Assigned To <span className="require-icon">*</span>
              </label>
              <div className="col-sm-3 col-form-label">
                <select
                  class="form-control"
                  name="assignedTo"
                  value={Values.assignedTo}
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option>Choose Task Name</option>
                  {users != null &&
                    users.map((user) => (
                      <option
                        key={user._id}
                        value={user._id}
                        className="option-text"
                      >
                        {user.userName}
                      </option>
                    ))}
                </select>
              </div>
              {/* <span id="user-error">{errEmail}</span> */}
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

export default AddTask;
