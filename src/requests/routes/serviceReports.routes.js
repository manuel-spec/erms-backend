const express = require("express");
const {
    createServiceReportValidator,
    updateServiceReportValidator,
    idValidatorSR,
} = require("../validators/serviceReport.validator.js");
const {
    getServiceReportsController,
    getServiceReportController,
    postServiceReportController,
    updateServiceReportController,
    deleteServiceReportController,
} = require("../controllers/serviceReport.controller.js");
const { CatchAsync } = require("../../../utils/catchAsync.js");

const Router = express.Router();
Router.get("/", CatchAsync(getServiceReportsController));
Router.post(
    "/",
    createServiceReportValidator,
    CatchAsync(postServiceReportController)
);
Router.get("/:id", idValidatorSR, CatchAsync(getServiceReportController));
Router.patch(
    "/:id",
    updateServiceReportValidator,
    CatchAsync(updateServiceReportController)
);
Router.delete("/:id", idValidatorSR, CatchAsync(deleteServiceReportController));

module.exports = Router;
