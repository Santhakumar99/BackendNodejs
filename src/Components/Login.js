import React from "react";
// import { TextField } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const Login = () => {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState();
  const [password, setPassword] = useState("");

  const LoginHandler = async (e) => {
    e.preventDefault();
    const value = {
      email: email,
      password: password,
    };
    try {
      const result = await axios.post(
        `http://localhost:6400/users/login`,
        value
      );
      console.log(result.data.token);
      let Newtoken = result != null && result.data && result.data.token.token;
      console.log(Newtoken);
      localStorage.setItem("user", Newtoken);
      history("/viewusers");
    } catch (error) {
      console.log(error);
      alert("Something went Wrong!!!");
    }
  };
  // console.log(token);
  // const user = jwt_decode(token);
  // console.log(user);
  return (
    <div>
      <div className="container">
        <div
          className="form-section"
          style={{ marginTop: "140px", background: "steelblue" }}
        >
          <h1>Login</h1>
          <form
            className="contact-us-form"
            onSubmit={LoginHandler}
            style={{ padding: "20px" }}
          >
            <div className="col-md-12">
              <label className="col-sm-3 col-form-label">
                Email <span className="require-icon">*</span>
              </label>
              <input
                label="Email"
                size="small"
                type="email"
                fullWidth
                name="username"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoFocus
              />

              <span id="user-error">{errEmail}</span>
            </div>
            <br />
            <div className="col-md-12">
              <label className="col-sm-3 col-form-label">
                Password <span className="require-icon">*</span>
              </label>
              <input
                label="Password"
                size="small"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
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
                {/* <div className="col-lg-6 contact-us-form-group">
                <button
                  className="contact-us-form-btn"
                  onClick={() => history.push("/forgotpassword")}
                >
                  Forgot Password
                </button>
              </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
