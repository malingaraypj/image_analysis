const express = require("express");
const infoCardsController = require("./../Controllers/infoCardsController");

const Router = express.Router();

Router.route("/").get(infoCardsController.getInfoCards);

module.exports = Router;
