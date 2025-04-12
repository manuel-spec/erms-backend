const express = require("express");

const { swapIndicatorOrdersController } = require("./indicator.controller.js");

const Router = express.Router();

Router.patch("/swap-orders", swapIndicatorOrdersController);

module.exports = Router;
