const express = require("express");
const {
    postAllIndicatorValueTypesController,
    updateAllIndicatorValueTypesController,
    deleteAllIndicatorValueTypesController,
    getAllIndicatorValueTypesController,
} = require("../indicator.controller.js");
const { CatchAsync } = require("../../../utils/catchAsync.js");

const Router = express.Router();

Router.get("/", CatchAsync(getAllIndicatorValueTypesController));
Router.post("/", CatchAsync(postAllIndicatorValueTypesController));
Router.patch("/:id", CatchAsync(updateAllIndicatorValueTypesController));
Router.delete("/:id", CatchAsync(deleteAllIndicatorValueTypesController));

module.exports = Router;
