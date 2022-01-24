import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const history = useNavigate();
  const [Users, setUsers] = useState("");
  const [Values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    address: "",
    mobile: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = Values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  useEffect(() => {
    getUsers();
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
        `http://localhost:6400/users`,
        userDatails,
        { mode: "cors" }
        // {
        //   headers: {
        //     authorization:
        //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWRiZGRmMGFmYjY5YWVkYTEzYTJlZDkiLCJVc2VyTmFtZSI6IlJTSyIsIkVtYWlsIjoic2FuZHlzYW52aTQ3QGdtYWlsLmNvbSIsImlhdCI6MTY0MTg5MzQ2Nn0.DwXkPvVB9MENQvtJJyjUBDWDfYhk_79gbxELf2n-9XU",
        //   },
        // }
      );
      console.log(result);
      alert("user created successfully");
      setValues({});
      history("/viewusers");
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
      console.log(result);

      //   alert("user created successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ margin: "40px" }}>
      <h1>Users</h1>
      <div className="container">
        <form
          className="contact-us-form"
          onSubmit={UserCreateHandler}
          style={{ padding: "20px" }}
        >
          <div className="col-md-12">
            <label className="col-sm-3 col-form-label">
              User Name <span className="require-icon">*</span>
            </label>
            <input
              label="Email"
              size="small"
              type="text"
              fullwidth
              name="userName"
              variant="outlined"
              value={Values.userName}
              onChange={(e) => onChangeHandler(e)}
              required
              autoFocus
            />

            {/* <span id="user-error">{errEmail}</span> */}
          </div>
          <div className="col-md-12">
            <label className="col-sm-3 col-form-label">
              Mobile <span className="require-icon">*</span>
            </label>
            <input
              label="Email"
              size="small"
              type="number"
              fullwidth
              name="mobile"
              variant="outlined"
              value={Values.mobile}
              onChange={(e) => onChangeHandler(e)}
              required
              autoFocus
            />

            {/* <span id="user-error">{errEmail}</span> */}
          </div>
          <div className="col-md-12">
            <label className="col-sm-3 col-form-label">
              Email <span className="require-icon">*</span>
            </label>
            <input
              label="Email"
              size="small"
              type="email"
              fullwidth
              name="email"
              variant="outlined"
              value={Values.email}
              onChange={(e) => onChangeHandler(e)}
              required
              autoFocus
            />
          </div>
          <div className="col-md-12">
            <label className="col-sm-3 col-form-label">
              Password <span className="require-icon">*</span>
            </label>
            <input
              label="Password"
              size="small"
              type="password"
              name="password"
              fullwidth
              variant="outlined"
              value={Values.password}
              onChange={(e) => onChangeHandler(e)}
              required
            />
          </div>
          <div className="col-md-12">
            <label className="col-sm-3 col-form-label">
              Address <span className="require-icon">*</span>
            </label>
            <input
              label="Address"
              size="small"
              type="text"
              fullwidth
              name="address"
              variant="outlined"
              value={Values.address}
              onChange={(e) => onChangeHandler(e)}
              required
              autoFocus
            />

            {/* <span id="user-error">{errEmail}</span> */}
          </div>
          <div
            className="col-md-12 contact-us-form-group"
            style={{ padding: "20px" }}
          >
            <div className="row">
              <div className="contact-us-form-group">
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

export default Users;
