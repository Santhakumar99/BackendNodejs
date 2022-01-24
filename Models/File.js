const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    FileId: {
      type: String,
      required: true,
      unique: true,
    },
    path: {
      type: String,
      required: true,
    },
    mimetype: String,
    size: Number,
    category: {
      type: String, // [task, subtask]
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      // required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("file", FileSchema);
