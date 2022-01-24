const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("authorization");
  console.log(token);
  // Handel no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization failed" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwt_secret"));
    req.user = decoded;
    // TODO: verfy current status of user before continue

    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
