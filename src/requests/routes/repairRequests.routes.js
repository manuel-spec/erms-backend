const express = require("express");
const {
    createRepairRequestValidator,
    updateRepairRequestValidator,
    idValidator,
} = require("../validators/repairRequest.validator.js");
const {
    getRepairRequestsController,
    getRepairRequestController,
    postRepairRequestController,
    updateRepairRequestController,
    deleteRepairRequestController,
} = require("../controllers/requestReport.controller.js");
const { CatchAsync } = require("../../../utils/catchAsync.js");

const router = express.Router();
router.get("/", CatchAsync(getRepairRequestsController));
router.post(
    "/",
    createRepairRequestValidator,
    CatchAsync(postRepairRequestController)
);
router.get("/:id", idValidator, CatchAsync(getRepairRequestController));
router.patch("/:id", CatchAsync(updateRepairRequestController));
router.delete("/:id", idValidator, CatchAsync(deleteRepairRequestController));

module.exports = router;
