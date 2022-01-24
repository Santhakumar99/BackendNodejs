const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  docProject: String,
});
module.exports = mongoose.model("projects", ProjectSchema);
