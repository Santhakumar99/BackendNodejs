import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditForm = () => {
  const history = useNavigate();
  const [values, setValues] = useState({
    _id: "",
    name: "",
    position: "",
    age: "",
  });
  const [UpdateButton, setUpdateButton] = useState({ update: false, _id: "" });
  const [getData, setGetData] = useState([{}]);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  useEffect(() => {
    handleGetProject();
  }, []);

  const search = useLocation().search;

  // const search = useLocation().search;
  const RoleID = new URLSearchParams(search).get("id");
  console.log(RoleID);

  const handleGetProject = async (e) => {
    // e.preventDefault();
    try {
      let vals = values;
      const valuesObj = {
        ...vals,
      };
      const Result = await axios.get(
        `http://localhost:6400/position/${RoleID}`

        //   {
        //     headers: {
        //       Authorization: localStorage.getItem("user-info"),
        //     },
        //   }
      );
      setGetData(Result.data.developers);
      console.log(Result.data.developers);
      setValues(Result.data.developers);
      setUpdateButton({ _id: Result.data.developers._id, update: true });
      //   toast.success("Created Successfully");
    } catch (error) {
      console.log(error);
    }

    // }
  };
  const handleUpdateDeveloper = async (e, id) => {
    console.log(id);
    try {
      let vals = values;
      const valuesObj = {
        ...vals,
      };
      await axios.put(
        `http://localhost:6400/position/${id}`,
        valuesObj,
        { mode: "cors" },
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:6400/position",
          },
        }
      );
      console.log("Developer Updated Successfully");
      history("/viewdev");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div className="container">
          <h1 style={{ padding: "20px" }}>Update Developer</h1>
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
                    value={values.name ? values.name : undefined}
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
                    value={values.position ? values.position : undefined}
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
                    value={values.age ? values.age : undefined}
                    className="form-control"
                    placeholder="Age"
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={(e) => handleUpdateDeveloper(e, UpdateButton._id)}
            >
              Update
            </button>
          </form>
        </div>

        {/* <DataTable columns={columns} data={getData} /> */}
      </div>
    </div>
  );
};
export default EditForm;
