const mongoose = require("mongoose");

const FilesSchema = new mongoose.Schema(
  {
    fileId: {
      type: String,
      required: true,
      // unique: true,
    },
    path: {
      type: String,
      required: true,
    },
    mimetype: String,
    size: Number,
    status: {
      type: Number,
      default: 1,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      // required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("files", FilesSchema);
