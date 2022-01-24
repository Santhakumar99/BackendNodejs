const fs = require("fs");
const Files = require("../Files/file.model");

// * Save file details in db
// */
exports.saveFileController = async (fileInfo, category, id) => {
  console.log(fileInfo.path);

  const file = Files({
    fileId: fileInfo.filename,
    path: fileInfo.path,
    mimetype: fileInfo.mimetype,
    size: fileInfo.size,
    uploadedBy: id,
  });
  console.log(file);
  await file.save();
  //   console.log(res.json(file));
};
exports.deleteFileController = async (fileId, category) => {
  const result = await File.findOneAndUpdate(
    { fileId, category },
    { status: 9 }
  );
  console.log("Image path", result);
  _deleteFileInDisk(result.path);
};
