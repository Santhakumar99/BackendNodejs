import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

let allUsers = [];
const ViewTask = () => {
  const history = useNavigate();
  const [Tasks, setTasks] = useState("");
  const [Values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    address: "",
    mobile: "",
  });
  const [pages, setPages] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = Values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  useEffect(() => {
    getTasks();
    getUserHandler();
  }, [pages.currentPage]);
  const getUserHandler = async (e) => {
    // e.preventDefault();
    // const userDatails = {
    //   ...Values,
    // };
    try {
      const result = await axios.get(
        `http://localhost:6400/users`,
        // userDatails,
        { mode: "cors" }
      );
      console.log(result.data?.data);
      allUsers = result.data && result.data.data ? result.data.data : [];
      // alert("user created successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const getUsername = (id) => {
    console.log(id);
    console.log(allUsers);
    let userName =
      allUsers != null && allUsers.find((aUser) => aUser._id === id);
    var Name = userName.firstName + " " + userName.lastName;
    // var icNumber = userName.icNumber;
    return Name;
  };
  const getTasks = async (e) => {
    // e.preventDefault();
    // const userDatails = {
    //   ...Values,
    // };
    try {
      const result = await axios.get(`http://localhost:6400/tasks/`);
      console.log(result);
      if (result && result.data) {
        let array = result.data;
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          element.id = i + 1;
        }
        setTasks(array);
        setPages({
          currentPage: pages.currentPage,
          totalPages: result.data.totalPages,
        });
        console.log(array);
      }
      //   alert("user created successfully");
    } catch (err) {
      console.log(err);
    }
  };
  //--------------------handle Update Developer ------------------
  const handleDeleteDeveloper = async (id) => {
    console.log(id);
    try {
      await axios.delete(
        `http://localhost:6400/tasks/${id}`,
        {
          mode: "cors",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:6400/",
          },
        }
      );
      getTasks();
      console.log("Developer Deleted Successfully");
    } catch (error) {
      console.log(error);
    }

    // }
  };
  const columns = [
    {
      name: "S.No",
      selector: (row) => row.id,
    },
    {
      name: "User Name",
      selector: (row) => row.taskname,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Address",
      selector: (row) => row.address,
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
              //   onClick={(e) => history("/editdev?id=" + row._id)}
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
  const gotoAdd = () => {
    history("/users");
  };
  const handlePagination = (page) => {
    setPages({ ...pages, currentPage: page.selected + 1 });
  };
  const count = Number(pages.totalPages);
  return (
    <div>
      <h1 style={{ padding: "20px" }}>Users</h1>
      <div className="addButton" style={{ float: "right", padding: "20px" }}>
        <button className="btn btn-primary" onClick={gotoAdd}>
          + Add
        </button>
      </div>
      <div className="tablehead" style={{ padding: "20px" }}>
        <DataTable
          columns={columns}
          data={Tasks}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>
      <div className="Pagination-part" style={{ margin: "20px" }}>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel="..."
          pageCount={count || 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          activeClassName="active"
          forcePage={pages.currentPage !== 0 ? pages.currentPage - 1 : 0}
          onPageChange={(page) => handlePagination(page)}
          pageClassName={"page-item"}
          nextLinkClassName={"page-link"}
          nextClassName={"page-item next"}
          previousClassName={"page-item prev"}
          previousLinkClassName={"page-link"}
          pageLinkClassName={"page-link"}
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName={
            "pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
          }
        />
      </div>
    </div>
  );
};

export default ViewTask;
