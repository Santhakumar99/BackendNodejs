import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import e from "cors";
const Form = () => {
  const history = useNavigate();
  const [getData, setGetData] = useState([{}]);
  const [values, setValue] = useState({ searchvalue: "" });

  const [searchText, setSearchText] = useState();
  useEffect(() => {
    handleGetProject();
  }, []);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = values;
    inputValues[name] = value;
    setValue({ ...inputValues });
  };
  const handleGetProject = async (e) => {
    // e.preventDefault();
    try {
      const valuesObj = {
        isBorrower: true,
      };
      const result = await axios.get(
        `http://localhost:6400/position`,
        valuesObj
      );
      if (result && result.data.developers) {
        let array = result.data.developers;
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          element.id = i + 1;
        }
        setGetData(array);
        console.log(array);
      }
      //   toast.success("Created Successfully");
    } catch (error) {
      console.log(error);
    }

    // }
  };
  const EditHandler = (id) => {
    console.log(id);
    history("/editdev", id);
  };
  //--------------------handle Update Developer ------------------
  const handleUpdateDeveloper = async (id) => {
    try {
      // let vals = values;
      // const valuesObj = {
      //   ...vals,
      // };
      await axios.put(
        `http://localhost:6400/position/${id}`,
        // valuesObj,
        { mode: "cors" },
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:6400/position",
          },
        }
      );
      handleGetProject();
      console.log("Developer Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  //--------------------handle Update Developer ------------------
  const handleDeleteDeveloper = async (id) => {
    console.log(id);
    try {
      await axios.delete(
        `http://localhost:6400/position/${id}`,
        {
          mode: "cors",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:6400/",
          },
        }
      );
      handleGetProject();
      console.log("Developer Deleted Successfully");
    } catch (error) {
      console.log(error);
    }

    // }
  };
  //--------------------handle Search Developer Data ------------------

  const SearchDevData = async (e) => {
    e.preventDefault();
    try {
      const Result = await axios.get(
        `http://localhost:6400/position?searchText=${searchText}`
      );
      console.log(Result);
    } catch (error) {
      console.log(error);
    }
  };
  const gotoAdd = () => {
    history("/adddev");
  };
  const columns = [
    {
      name: "S.No",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Position",
      selector: (row) => row.position,
    },
    {
      name: "Age",
      selector: (row) => row.age,
    },
    {
      name: "Edit",
      selector: "tenureMonths",
      sortable: true,
      // width: "9rem",
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">
            {/* <button > */}
            <i
              class="fa fa-edit"
              onClick={(e) => history("/editdev?id=" + row._id)}
            ></i>
          </div>
        </div>
      ),
      // format: (row) => {
      //   return row.tenure;
      // },
      wrap: true,
    },
    {
      name: "Delete",
      selector: "tenureMonths",
      sortable: true,
      // width: "9rem",
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">
            <i
              class="fa fa-trash"
              onClick={() => handleDeleteDeveloper(row._id)}
            ></i>
          </div>
        </div>
      ),
      // format: (row) => {
      //   return row.tenure;
      // },
      wrap: true,
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => row,
      style: {
        // backgroundColor: 'green',
        border: "1px black",
        color: "black",
        fontWeight: 500,
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        // paddingLeft: "8px", // override the cell padding for head cells
        // paddingRight: "8px",
        backgroundColor: "#0984e1",
        color: "white",
        fontWeight: 700,
        fontSize: "13px",
      },
    },
    cells: {
      style: {
        // fontSize: "17px",
        // paddingLeft: "0 8px",
        // backgroundColor: "#0984e1",
      },
    },
  };
  //   console.log(getData);
  return (
    <div>
      <h1 style={{ padding: "20px" }}> Developers</h1>
      <div className="search">
        <form>
          <input
            type="text"
            value={searchText}
            name="searchText"
            required
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={SearchDevData}
            style={{ margin: "5px" }}
          >
            Search
          </button>
        </form>
      </div>
      <div className="addButton" style={{ float: "right", padding: "20px" }}>
        <button className="btn btn-primary" onClick={gotoAdd}>
          + Add
        </button>
      </div>
      <div className="tablehead" style={{ padding: "20px" }}>
        <DataTable
          columns={columns}
          data={getData}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>
    </div>
  );
};
export default Form;
