const express = require("express");
const Router = express.Router();
const { loginUser } = require("../controllers/userController.js");
const verifyToken = require("../middlewares/verifyToken.js");
Router.route("/login").post(loginUser);
module.exports = Router;