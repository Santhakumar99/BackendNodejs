const express = require("express");
const router = express.Router();
const PostData = require("../Models/Post");
let mongoose = require("mongoose");
const cors = require("cors");

const {
  saveFileController,
  // downloadFileController,
  // deleteFileController,
} = require("../Routes/Files.js");
router.get("/", cors(), async (req, res) => {
  const filter = {
    // status: { $ne: 9 },
  };

  const users = await PostData.find({});
  console.log("users", users);
  res.json({
    developers: users,
  });
});

router.post("/login", cors(), async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
  }
  const users = await PostData.findOne({ _id: req.params.id });

  res.json({
    developers: users,
  });
});
router.get("/:id", cors(), async (req, res) => {
  // const filter = {
  //   // status: { $ne: 9 },
  // };

  const users = await PostData.findOne({ _id: req.params.id });

  res.json({
    developers: users,
  });
});

// router.get("/search", async (req, res) => {
//   console.log("123");

// });
router.post("/", cors(), async (req, res) => {
  try {
    const { name, position, age, dob } = req.body;
    const Posts = PostData({
      name,
      position,
      age,
    });
    await Posts.save();
    res.json(Posts);
  } catch (error) {
    console.log("Error", error);
    res.json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // const { _id } = req.user;
    const { name, position, age } = req.body;

    const Post = await PostData.findById(req.params.id);

    if (!Post) throw (404, { result: "Not Found", resultCode: 0 });

    Object.assign(Post, { name, position, age });
    await Post.save();
    res.json(Post);
  } catch (error) {
    console.log("Error", error);
    res.json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // const Post = await User.findOne({ _id: req.params.id });
    const Post = await PostData.findById(req.params.id);

    if (!Post) throw (404, { result: "Not Found", resultCode: 0 });
    await Post.remove();
    res.json({ result: "Deleted Successfully", resultCode: 0 });
  } catch (error) {
    console.log("Error", error);
    res.json(error);
  }
});

router.post("/file/:id", async (req, res) => {
  console.log(req);
  console.log(req.params);
  console.log("files", req.files);
  try {
    const user = await PostData.findById(req.params.id);
    console.log(user);

    if (!user) {
      console.log("No User found");

      throw new ApiExecutionFailed(404, {
        result: "Not Found. No User Found for this ID",
        resultCode: 1,
      });
    }
    await saveFileController(req.filename);

    user[key] = req.files.name;
    // user.updatedBy = userId;
    await user.save();
    console.log("File Uploaded", req.filename);
    // res.json({
    //   url: config.get("apis_base_url") + "users/doc/" + user[key],
    // });
  } catch (error) {
    console.log("Error ", error);
    // _handleError(error, res);
  }
});

module.exports = router;
