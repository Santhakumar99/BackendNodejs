// const { config } = require("dotenv");
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cors = require("cors");
const app = express();
const port = 6400;
const path = require("path");
const upload = require("express-fileupload");
const jwt = require("jsonwebtoken");
//Middlewares
const connectDb = require("./Config/Databaseconnecton");
connectDb();

const PostRoute = require("./Routes/Posts");
const UserRoute = require("./Routes/Users");
const TaskRoute = require("./Routes/Task");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/position", PostRoute);
app.use("/users", UserRoute);
app.use("/tasks", TaskRoute);
app.use("/projects", require("./Routes/Projects/project.routes"));
app.use(upload());
// app.use(cors());
// app.enableCors();
//Routes
// Init Middleware
app.use(express.json({ extended: true }));

//production used area [start]
app.use(express.static(path.join("public")));
//production used area [end]

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.get("/projects", (req, res) => {
  res.send("New Project");
  console.log("New Project");
});

//Listen
var server = app.listen(port, async function () {
  console.log("Express server listening on port " + port);
});
// module.exports = connectDB;
