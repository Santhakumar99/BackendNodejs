const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  age: { type: Number, required: true },
  // dob: { type: Date, required: true },
});

module.exports = mongoose.model("Posts", UserSchema);
