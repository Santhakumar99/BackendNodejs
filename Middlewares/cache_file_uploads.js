const config = require("config");
const multer = require("multer");
// const uuid = require("uuid/v1");
const { v1: uuid } = require("uuid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/bmp": "bmp",
  // for other doc types
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/pdf": "pdf",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",

  // csv - extra
  "text/csv": "csv",
  "application/xhtml+xml": "xhtml",
};
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, uuid() + "-" + fileName);
//   },
// });

// var upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//     }
//   },
// });
const cache_file_uploads = multer({
  limits: 500000, // its in bytes
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (req.originalUrl.startsWith("/projects/doc/")) {
        cb(null, config.get("files.projects"));
      } else {
        cb(null, config.get("files.temp"));
      }
      // cb(null, "uploads/resumes");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
      // cb(null, 'imageName' + '.' + ext);
    },
  }),

  // not depend on frontend validation
  // so fileFilter used to say error , accept/reject
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype]; // -> for true/false;
    const error = isValid ? null : new Error("Invalid Mime type [ file ext] ");
    cb(error, isValid);
  },
});

module.exports = cache_file_uploads;
