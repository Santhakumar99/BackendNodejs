const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model("Posts", PostSchema);
