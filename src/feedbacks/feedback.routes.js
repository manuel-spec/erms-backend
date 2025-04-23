// routes/technicianFeedback.routes.js
const express = require("express");
const {
    getFeedbacksController,
    getFeedbackController,
    postFeedbackController,
    updateFeedbackController,
    deleteFeedbackController,
} = require("./feedback.controller.js");
const { CatchAsync } = require("../../utils/catchAsync.js");
const {
    createTechnicianFeedbackValidator,
    updateTechnicianFeedbackValidator,
    technicianFeedbackIdValidator,
} = require("./feedback.validator.js");

const router = express.Router();

router.get("/", CatchAsync(getFeedbacksController));

router.post(
    "/",
    createTechnicianFeedbackValidator,
    CatchAsync(postFeedbackController)
);

router.get("/:id", CatchAsync(getFeedbackController));

router.patch(
    "/:id",

    CatchAsync(updateFeedbackController)
);

router.delete(
    "/:id",

    CatchAsync(deleteFeedbackController)
);

module.exports = router;
