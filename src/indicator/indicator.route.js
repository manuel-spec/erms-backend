const express = require("express");
const {
    idValidator,
    createIndicatorValidator,
    updateIndicatorValidator,
} = require("./indicator.validator.js");
const {
    getIndicatorsController,
    postIndicatorController,
    getIndicatorController,
    deleteIndicatorController,
    updateIndicatorController,
    swapIndicatorOrdersController,
} = require("./indicator.controller.js");
const { CatchAsync } = require("../../utils/catchAsync.js");
const { roleMiddleware } = require("../middleware/roleMiddleware.js");

const Router = express.Router();

Router.get("/", CatchAsync(getIndicatorsController));
Router.post("/", createIndicatorValidator, CatchAsync(postIndicatorController));
Router.get("/:id", idValidator, CatchAsync(getIndicatorController));
Router.patch("/:id", CatchAsync(updateIndicatorController));
Router.delete("/:id", idValidator, CatchAsync(deleteIndicatorController));
Router.patch("/swap-orders", swapIndicatorOrdersController);

module.exports = Router;
