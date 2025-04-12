const express = require("express");
const { CatchAsync } = require("../../../utils/catchAsync.js");
const {
    getOptionController,
    getOptionsController,
    createOptionsController,
    updateOptionsController,
    deleteOptionsController,
} = require("./options.controller.js");
const {
    createOptionValidator,
    updateOptionValidator,
} = require("./options.validator.js");
const router = express.Router();

router.get("/", CatchAsync(getOptionsController));

router.get("/:id", CatchAsync(getOptionController));

router.post("/", CatchAsync(createOptionsController));

router.patch(
    "/:id",
    updateOptionValidator,
    CatchAsync(updateOptionsController)
);

router.delete("/:id", CatchAsync(deleteOptionsController));

module.exports = router;
