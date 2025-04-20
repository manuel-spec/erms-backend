const Router = require("express").Router();
const requestRoutes = require("./routes/repairRequests.routes.js");
const serviceReportRoutes = require("./routes/serviceReports.routes.js");

Router.use("/repair-requests", requestRoutes);
Router.use("/service-reports", serviceReportRoutes);

module.exports = Router;
