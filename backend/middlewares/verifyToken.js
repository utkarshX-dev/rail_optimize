const ExpressError = require("../utils/ExpressError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new ExpressError("Invalid or missing token", 401);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user || user.token !== token) {
      throw new ExpressError("Unauthorized", 401);
    }

    next();
  } catch (err) {
    console.log(err);
    throw new ExpressError("Invalid or expired token", 401);
  }
};

module.exports = verifyToken;
