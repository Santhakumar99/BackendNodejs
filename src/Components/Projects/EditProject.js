import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const EditProject = () => {
  const history = useNavigate();
  const [Values, setValues] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
  });
  const [file, setFile] = useState({
    file: "",
  });
  const [UpdateButton, setUpdateButton] = useState({ update: false, _id: "" });
  const [getData, setGetData] = useState([{}]);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = Values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  useEffect(() => {
    handleGetProject();
  }, []);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    // setIsSelected(true);
  };
  const search = useLocation().search;

  // const search = useLocation().search;
  const RoleID = new URLSearchParams(search).get("id");
  console.log(RoleID);

  const handleGetProject = async (e) => {
    // e.preventDefault();
    try {
      let vals = Values;
      const valuesObj = {
        ...vals,
      };
      const Result = await axios.get(
        `http://localhost:6400/Projects/${RoleID}`
      );
      setGetData(Result.data.project);
      console.log(Result.data);
      setValues(Result.data.project);
      setUpdateButton({ _id: Result.data.project._id, update: true });
      console.log(UpdateButton);
      //   toast.success("Created Successfully");
    } catch (error) {
      console.log(error);
    }

    // }
  };
  const handleUpdateProject = async (id) => {
    console.log(id);
    try {
      let vals = Values;
      const valuesObj = {
        ...vals,
      };
      await axios.put(
        `http://localhost:6400/projects/newproject/${id}`,
        valuesObj
        // { mode: "cors" },
        // {
        //   headers: {
        //     "Access-Control-Allow-Origin": "http://localhost:6400/position",
        //   },
        // }
      );
      const formData = new FormData();
      console.log(selectedFile);
      formData.append("file", selectedFile);

      fetch(`http://localhost:6400/projects/doc/${id}?key=docProject`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log("Project Updated Successfully");
      history("/viewproject");
    } catch (error) {
      console.log(error);
    }
  };
  const documentHandler = (event) => {
    let pickedFile;
    console.log(event.target.files);
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
    console.log(file);
  };
  return (
    <div style={{ margin: "40px" }}>
      <h1>Update Project</h1>
      <div className="container">
        <form
          className="contact-us-form"
          onSubmit={handleUpdateProject}
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
          <div className="col-md-12">
            <div className="row">
              <label className="col-sm-3 col-form-label">
                Upload Files <span className="require-icon">*</span>
              </label>
              <input type="file" name="file" onChange={changeHandler} />
              {/* {isSelected ? (
                <div>
                  <p>Filename: {selectedFile.name}</p>
                  <p>Filetype: {selectedFile.type}</p>
                  <p>Size in bytes: {selectedFile.size}</p>
                  <p>
                    lastModifiedDate:{" "}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p>Select a file to show details</p>
              )} */}
              {/* <div>
                <button onClick={handleSubmission}>Submit</button>
              </div> */}
              {/* <span id="user-error">{errEmail}</span> */}
            </div>
          </div>
          <div
            className="col-md-12 contact-us-form-group"
            style={{ padding: "20px" }}
          >
            <div className="row">
              <div className="col-8 contact-us-form-group">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={(e) => handleUpdateProject(UpdateButton._id)}
                >
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
export default EditProject;
