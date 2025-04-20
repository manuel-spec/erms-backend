const express = require("express");
const {
    createAvailabilityValidator,
    updateAvailabilityValidator,
    idValidatorAV,
} = require("./availability.validator.js");
const {
    getAvailabilitiesController,
    getAvailabilityController,
    postAvailabilityController,
    updateAvailabilityController,
    deleteAvailabilityController,
} = require("./availability.controller.js");
const { CatchAsync } = require("../../../utils/catchAsync.js");

const Router = express.Router();
Router.get("/", CatchAsync(getAvailabilitiesController));
Router.post(
    "/",
    createAvailabilityValidator,
    CatchAsync(postAvailabilityController)
);
Router.get("/:id", idValidatorAV, CatchAsync(getAvailabilityController));
Router.patch(
    "/:id",

    CatchAsync(updateAvailabilityController)
);
Router.delete("/:id", idValidatorAV, CatchAsync(deleteAvailabilityController));

module.exports = Router;
