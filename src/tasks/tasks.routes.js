const Router = require("express").Router();

const skillsRoutes = require("./skills/skills.routes.js");
const technicianRoutes = require("./technicianSkill/technicianSkill.routes.js");
const availabilityRoutes = require("./availability/availability.routes.js");
const assignmentsRoutes = require("./assignment/assignment.routes.js");
Router.use("/skills", skillsRoutes);
Router.use("/technician-skills", technicianRoutes);
Router.use("/availability", availabilityRoutes);
Router.use("/assignments", assignmentsRoutes);
// const tasksRoutes = require("./tasks/tasks.routes.js");

module.exports = Router;
