const express = require("express");
const {
    createTechnicianSkillValidator,
    idValidatorTS,
} = require("./technicianSkill.validator.js");
const {
    getTechnicianSkillsController,
    postTechnicianSkillController,
    deleteTechnicianSkillController,
} = require("./technicianSkill.controller.js");
const { CatchAsync } = require("../../../utils/catchAsync.js");

const routerTS = express.Router();
routerTS.get("/", CatchAsync(getTechnicianSkillsController));
routerTS.post(
    "/",
    createTechnicianSkillValidator,
    CatchAsync(postTechnicianSkillController)
);
routerTS.delete(
    "/:userId/:skillId",
    idValidatorTS,
    CatchAsync(deleteTechnicianSkillController)
);

module.exports = routerTS;
