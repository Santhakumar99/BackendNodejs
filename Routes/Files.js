const fs = require("fs");
const File = require("../Models/File.js");

/**
 * Save file details in db
 */
exports.saveFileController = async (fileInfo, category, id) => {
  console.log("fileInfo", fileInfo);
  const file = File({
    // fileId: id,      // bcz it will repeat, fileName will be unique
    fileId: fileInfo.filename,
    path: fileInfo.path,
    mimetype: fileInfo.mimetype,
    size: fileInfo.size,
    category,
    uploadedBy: id,
  });
  await file.save();
  console.log("File Saved");
};

// /**
//  * Download file
//  */
// exports.downloadFileController = async (fileId, category, res) => {
//   const result = await File.findOne({ fileId, category });
//   res.setHeader("Content-type", result.mimetype);

//   var filestream = fs.createReadStream(result.path);
//   filestream.pipe(res);
// };

// /**
//  * Delete file from disk and then db
//  */
// exports.deleteFileController = async (fileId, category) => {
//   const result = await File.findOneAndUpdate(
//     { fileId, category },
//     { status: 9 }
//   );
//   console.log("Image path", result);
//   _deleteFileInDisk(result.path);
// };

// /**
//  * Delete file from disk
//  */
// const _deleteFileInDisk = (path) => {
//   console.log("_deleteFileInDisk: " + path);
//   try {
//     if (fs.existsSync(path)) {
//       fs.unlinkSync(path);
//     }
//   } catch (error) {
//     // console.log(error);
//   }
// };
