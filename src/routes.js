const express = require("express");
const authRoutes = require("./auth/auth.routes.js");

const passport = require("passport");
const profileRoutes = require("./profile/profile.routes.js");
const myProfileRoutes = require("./profile/me/profile.routes.js");
const indicatorRoutes = require("./indicator/indicator.route.js");
const indicatorSwapRoutes = require("./indicator/swap/indicator.route.js");
const indicatorValueTypesRoutes = require("./indicator/indicatorValues/indivatorValues.route.js");

const { roleMiddleware } = require("./middleware/roleMiddleware.js");
const optionRoutes = require("./indicator/options/options.routes.js");

const Router = express.Router();

// Use authentication routes
Router.use("/auth", authRoutes);

Router.use(
    "/user/profile",
    // passport.authenticate("jwt", { session: false }),
    profileRoutes
);
Router.use(
    "/users/me",
    // passport.authenticate("jwt", { session: false }),
    myProfileRoutes
);

Router.use(
    "/indicators",
    passport.authenticate("jwt", { session: false }),

    indicatorRoutes
);
Router.use(
    "/indicator-swap",
    // passport.authenticate("jwt", { session: false }),
    indicatorSwapRoutes
);
Router.use(
    "/indicators-value-types/values",
    // passport.authenticate("jwt", { session: false }),
    indicatorValueTypesRoutes
);

Router.use(
    "/indicator-options",
    passport.authenticate("jwt", { session: false }),
    optionRoutes
);
module.exports = Router;
