const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskname: { type: String, required: true },
  createdOn: { type: Date, required: true },
  finished: { type: Date, required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
