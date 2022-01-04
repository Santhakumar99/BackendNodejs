const express = require("express");
const router = express.Router();
const Tasks = require("../Models/taskmodel");

router.get("/", (req, res) => {
  res.send("");
});

router.post("/", async (req, res) => {
  const task = new Tasks({
    taskname: req.body.taskname,
    createdOn: req.body.createdOn,
    finished: req.body.finished,
  });
  newtask = await task.save();
  res.json(task);
});

module.exports = router;
