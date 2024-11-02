const express = require("express");
const userController = require("./../Controllers/userController");

const Router = express.Router();

Router.route("/signup").post(userController.signup);

module.exports = Router;
