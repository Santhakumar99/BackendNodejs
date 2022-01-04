const express = require("express");
const router = express.Router();
const PostData = require("../Models/Post");
let mongoose = require("mongoose");
const cors = require("cors");
router.get("/", cors(), async (req, res) => {
  const filter = {
    // status: { $ne: 9 },
  };

  const users = await PostData.find(filter);

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

module.exports = router;
