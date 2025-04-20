const express = require("express");
const {
    createAssignmentValidator,
    updateAssignmentValidator,
    idValidator,
} = require("./assignment.validator.js");
const {
    getAssignmentsController,
    getAssignmentController,
    postAssignmentController,
    updateAssignmentController,
    deleteAssignmentController,
} = require("./assignment.controller.js");
const { CatchAsync } = require("../../../utils/catchAsync.js");

const router = express.Router();
router.get("/", CatchAsync(getAssignmentsController));
router.post(
    "/",
    createAssignmentValidator,
    CatchAsync(postAssignmentController)
);
router.get("/:id", idValidator, CatchAsync(getAssignmentController));
router.patch(
    "/:id",
    updateAssignmentValidator,
    CatchAsync(updateAssignmentController)
);
router.delete("/:id", idValidator, CatchAsync(deleteAssignmentController));

module.exports = router;
