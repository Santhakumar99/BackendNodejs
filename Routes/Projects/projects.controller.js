const mongoose = require("mongoose");
const ProjectData = require("../Projects/projects.model");
const ApiExecutionFailed = require("../../Errors/ApiExecutionFailed");
const Constants = require("../../Config/constants");
const {
  saveFileController,
  deleteFileController,
} = require("../../Files/file.controller");

exports.saveUserDocController = async (req, res) => {
  try {
    const { key } = req.body;
    const user = await ProjectData.findById(req.params.id);
    if (!user) {
      console.log("No User found");

      throw new ApiExecutionFailed(404, {
        result: "Not Found. No User Found for this ID",
        resultCode: 1,
      });
    }
    console.log("User", user);
    if (user && user[key]) {
      deleteFileController(user[key], Constants.FILE_CATEGORY[key]);
    }
    await saveFileController(req.file, Constants.FILE_CATEGORY[key], user._id);
    user[key] = req.file.filename;
    user.updatedBy = id;
    await user.save();
    console.log("File Uploaded", req.file);
    res.json({
      url: config.get("apis_base_url") + "projects/doc/" + user[key],
    });
  } catch (error) {
    console.log("Error ", error);
    _handleError(error, res);
  }
};
exports.getAllProjectController = async (req, res) => {
  try {
    const project = await ProjectData.find({});
    res.json(project);
  } catch (err) {
    console.log(err);
  }
};
exports.getProjectController = async (req, res) => {
  try {
    const project = await ProjectData.findById(req.params.id);
    if (!project) throw (404, { result: "Not Found", resultCode: 0 });
    res.json({ project });
  } catch (err) {
    console.log(err);
  }
};
exports.createProjectController = async (req, res) => {
  try {
    const { projectName, startDate, endDate } = req.body;
    const Project = ProjectData({ projectName, startDate, endDate });
    const data = await Project.save();
    res.json(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
exports.updateProjectController = async (req, res) => {
  try {
    const { projectName, startDate, endDate } = req.body;
    const project = await ProjectData.findById(req.params.id);
    if (!project) throw (404, { result: "Not Found", resultCode: 0 });
    Object.assign(project, { projectName, startDate, endDate });
    await project.save();
    res.json(project);
  } catch (err) {
    _handleError(err, res);
    // res.json(err);
  }
};
exports.RemoveProjectController = async (req, res) => {
  try {
    // const { projectName, startDate, endDate } = req.body;
    const project = await ProjectData.findById(req.params.id);
    if (!project) throw (404, { result: "Not Found", resultCode: 0 });
    await project.remove();
    res.status(200).json({ msg: "Deleted Successfully" });
  } catch (err) {
    _handleError(err, res);
    // res.json(err);
  }
};
// internal utility functions
const _handleError = (err, res) => {
  if (err instanceof ApiExecutionFailed) {
    res.status(err.status).json(err.payload);
  } else {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: "Server Error!" }] });
  }
};
