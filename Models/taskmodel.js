const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskname: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

module.exports = mongoose.model("Task", TaskSchema);
