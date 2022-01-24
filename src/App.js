import logo from "./logo.svg";
import "./App.css";
import Form from "./Components/Form";
// import { Route } from "react-router";
import EditForm from "./Components/EditForm";
import AddDeveloper from "./Components/AddDeveloper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Users from "./Components/Users";
import ViewUsers from "./Components/ViewUsers";
import AddTask from "./Components/Tasks/AddTask";
import ViewTask from "./Components/Tasks/ViewTask";
import MovieList from "./Components/newOne";
import AddProject from "./Components/Projects/AddProject";
import EditProject from "./Components/Projects/EditProject";
import ViewProject from "./Components/Projects/viewProject";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/viewusers" element={<ViewUsers />}></Route>
          <Route exact path="/users" element={<Users />}></Route>
          <Route exact path="/viewdev" element={<Form />}></Route>
          <Route exact path="/editdev" element={<EditForm />}></Route>
          <Route exact path="/adddev" element={<AddDeveloper />}></Route>
          <Route exact path="/addtask" element={<AddTask />}></Route>
          <Route exact path="/viewtask" element={<ViewTask />}></Route>
          {/* <Route exact path="/pdf" element={<MovieList />}></Route> */}
          <Route exact path="/addproject" element={<AddProject />}></Route>
          <Route exact path="/editproject" element={<EditProject />}></Route>
          <Route exact path="/viewproject" element={<ViewProject />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
