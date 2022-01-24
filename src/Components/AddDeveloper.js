import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddDeveloper = () => {
  const history = useNavigate();
  const [values, setValues] = useState({
    // _id: "",
    name: "",
    position: "",
    age: "",
  });
  const [file, setFile] = useState({
    file: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  //--------------------handle Add Project ------------------
  const handleAddProject = async () => {
    // e.preventDefault();
    try {
      let vals = values;
      const valuesObj = {
        ...vals,
      };

      console.log(file);
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:6400",
        },
      };
      const result = await axios.post(
        "http://localhost:6400/position/",
        valuesObj,
        { mode: "cors" },
        config
      );
      console.log(result.data._id);
      // var Id = result != null && result.data != null && result.data._id;
      // const formData = new FormData();
      // file && formData.append("docs", file);
      // const resultfile = await axios.post(
      //   `http://localhost:6400/position/file/${Id}`,
      //   formData
      // );
      console.log("Developer Added");
      // console.log(resultfile);
      history("/viewdev");
    } catch (error) {
      console.log(error);
    }

    // }
  };
  const documentHandler = (event) => {
    let pickedFile;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
    console.log(pickedFile);
  };
  return (
    <div>
      <div className="container">
        <h1>Add Developer</h1>
        <form style={{ marginTop: "40px" }}>
          <div className="form-group" style={{ padding: "20px" }}>
            <div className="row">
              <label className="col-sm-3 col-form-label">
                Name <span className="require-icon">*</span>
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="name"
                  id="projectname"
                  className="form-control"
                  placeholder="Name"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className="form-group" style={{ padding: "20px" }}>
            <div className="row">
              <label className="col-sm-3 col-form-label">
                Position <span className="require-icon">*</span>
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="position"
                  id="projectname"
                  className="form-control"
                  placeholder="Position"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className="form-group" style={{ padding: "20px" }}>
            <div className="row">
              <label className="col-sm-3 col-form-label">
                Age <span className="require-icon">*</span>
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  name="age"
                  id="projectname"
                  className="form-control"
                  placeholder="Age"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className="form-group" style={{ padding: "20px" }}>
            <div className="row">
              <label className="col-sm-3 col-form-label">
                Developer Pic <span className="require-icon">*</span>
              </label>
              <div className="col-sm-9">
                <input
                  type="file"
                  name="docs"
                  id="projectname"
                  className="form-control"
                  placeholder="Age"
                  onChange={documentHandler}
                />
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddProject}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDeveloper;
