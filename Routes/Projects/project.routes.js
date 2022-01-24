const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {
  getAllProjectController,
  getProjectController,
  createProjectController,
  RemoveProjectController,
  updateProjectController,
  saveUserDocController,
} = require("../Projects/projects.controller");
const cache_file_uploads = require("../../Middlewares/cache_file_uploads");
router.get("/", getAllProjectController);
router.get("/:id", getProjectController);
router.post("/newproject", createProjectController);
router.post(
  "/doc/:id",
  [cache_file_uploads.single("file")],
  // [cache_file_uploads.single("docForm16")],
  saveUserDocController
);

router.put("/newproject/:id", updateProjectController);
router.delete("/newproject/:id", RemoveProjectController);

module.exports = router;
