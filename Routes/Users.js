const express = require("express");
const router = express.Router();
const UserData = require("../Models/User");
const config = require("config");
let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const ApiExecutionFailed = require("../Errors/ApiExecutionFailed.js");
const Constants = require("../Errors/Constants");
const jwt = require("jsonwebtoken");
// // Load Middlewares
const auth = require("../Middlewares/autho.js");
const _encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encPassword = await bcrypt.hash(password, salt);
  return encPassword;
};
router.post("/", cors(), async (req, res) => {
  const { userName, address, mobile, email, password } = req.body;

  let user = await UserData.findOne({ $or: [{ userName }, { email }] });

  if (user && user.userName) {
    throw new ApiExecutionFailed(400, {
      errors: [
        { msg: "Username is already exist, please try different one !!!" },
      ],
    });
  }

  if (user && user.email) {
    throw new ApiExecutionFailed(400, {
      errors: [{ msg: "Email is already exist, please try different one !!!" }],
    });
  }
  const encPassword = await _encryptPassword(password);
  user = new UserData({
    email,
    userName,
    password: encPassword,
    address,
    mobile,
    createdOn: new Date(),
  });
  await user.save();
  res.json(user);
  console.log(user);
});

router.get("/", cors(), async (req, res) => {
  const page = +req.query.page || 1;
  const skip = (page - 1) * Constants.MAX_USERS_PER_PAGE;
  const paginate = { skip, limit: Constants.MAX_USERS_PER_PAGE };
  const filter = {
    // status: { $ne: 9 },
  };

  let query = { userName: { $exists: true } };
  const totalDocs = await UserData.countDocuments(query);
  const totalPages = Math.ceil(totalDocs / Constants.MAX_USERS_PER_PAGE);

  const users = await UserData.find(query, "-password", paginate);
  res.json({
    totalPages,
    currentPage: page,
    data: users,
    totalDocs,
  });
});

router.post("/login", cors(), async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(404).json("Email field is empty");
  } else if (!password) {
    return res.status(404).json("Password field is empty");
  } else {
  }
  var query;
  query = { email: email };
  console.log(query);
  const user = await UserData.findOne(query);
  console.log(user, "user");
  if (!user) {
    throw new ApiExecutionFailed(401, {
      errors: [{ msg: "Not found user !!!" }],
    });
  }

  console.log(password, "password");
  console.log(user.password, "given password");
  const passwordMatches = await bcrypt.compare(password, user.password);
  console.log(passwordMatches);
  if (!passwordMatches) {
    throw new ApiExecutionFailed(401, {
      errors: [{ msg: "Invalid Password" }],
    });
  }

  console.log("userlogin", user);
  const token = await _generateJwt(user);
  console.log("usertoken", token);
  // Save last login Date & Time
  user.lastLoginDateTime = new Date();
  // res.json(user);
  await user.save();
  res.json({ token: token, email: email, UserName: user.userName });
  console.log("Last Login Details Saved ", user.lastLoginDateTime);
});

const _generateJwt = async (user) => {
  console.log(user);
  const tokenData = {
    userId: user.id ? user.id : null,
    UserName: user.userName ? user.userName : null,
    Email: user.email ? user.email : null,
  };
  const token = jwt.sign(tokenData, config.get("jwt_secret"));
  return { token: token };
};
router.delete("/:id", async (req, res) => {
  try {
    // const Post = await User.findOne({ _id: req.params.id });
    const User = await UserData.findById(req.params.id);

    if (!User) throw (404, { result: "Not Found", resultCode: 0 });
    await User.remove();
    res.json({ result: "Deleted Successfully", resultCode: 0 });
  } catch (error) {
    console.log("Error", error);
    res.json(error);
  }
});
// internal utility functions
const _handleError = (err, res) => {
  if (err instanceof ApiExecutionFailed) {
    res.status(err.status).json(err.payload);
  } else {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: "Server Error!" }] });
  }
};

module.exports = router;
