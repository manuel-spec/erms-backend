const express = require("express");
const {
    createSkillValidator,
    updateSkillValidator,
    idValidator,
} = require("./skills.validator.js");
const {
    getSkillsController,
    getSkillController,
    postSkillController,
    updateSkillController,
    deleteSkillController,
} = require("./skills.controller.js");
const { CatchAsync } = require("../../utils/catchAsync.js");

const router = express.Router();

router.get("/", CatchAsync(getSkillsController));
router.post("/", createSkillValidator, CatchAsync(postSkillController));
router.get("/:id", idValidator, CatchAsync(getSkillController));
router.patch("/:id", updateSkillValidator, CatchAsync(updateSkillController));
router.delete("/:id", idValidator, CatchAsync(deleteSkillController));

module.exports = router;
