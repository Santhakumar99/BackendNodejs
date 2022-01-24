const express = require("express");
const router = express.Router();
const Tasks = require("../Models/taskmodel");

router.get("/", async (req, res) => {
  try {
    const tasks = await Tasks.find({}).populate("Users");
    res.json(tasks);
  } catch (err) {
    console.log(err);
  }
});

router.post("/newtask", async (req, res) => {
  const task = new Tasks({
    taskname: req.body.taskname,
    assignedTo: req.body.assignedTo,
  });
  newtask = await task.save();
  res.json(task);
});

module.exports = router;
