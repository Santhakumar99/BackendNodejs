const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Users", UserSchema);
