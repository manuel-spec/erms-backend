const express = require("express");
const { getMyProfile } = require("./profile.controller.js");
const { CatchAsync } = require("../../../utils/catchAsync");
const { verifyUser } = require("../../middleware/tokenHandlerMiddleware.js");

const Router = express.Router();

Router.get("/", verifyUser, CatchAsync(getMyProfile));

module.exports = Router;
