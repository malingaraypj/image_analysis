const express = require("express");
const infoCardsController = require("./../Controllers/infoCardsController");

const Router = express.Router();

Router.route("/").get(infoCardsController.getInfoCards);

Router.route("/:id").get(infoCardsController.getInfoCard);

module.exports = Router;
