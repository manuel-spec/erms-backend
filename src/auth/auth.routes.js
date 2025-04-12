const express = require("express");
const rateLimit = require("express-rate-limit");
const {
    loginController,
    registerController,
    invitationController,
    tokenVerificationController,
    forgotPasswordController,
    resetPasswordController,
    getRoles,
    getRole,
    changePasswordController,
} = require("./auth.controller.js");
const { verifyUser } = require("../middleware/tokenHandlerMiddleware.js");
const {
    loginValidator,
    registerValidator,
    invitationValidator,
    tokenValidator,
    roleIdValidator,
    resetPasswordValidator,
    myPasswordResetValidator,
} = require("./auth.validator.js");
const { Role } = require("./model/role.model.js");
const { CatchAsync } = require("../../utils/catchAsync.js");
const { roleMiddleware } = require("../middleware/roleMiddleware.js");

// Define a rate limiter for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15-minute window
    max: 15, // Limit each IP to 15 login requests per 15 minutes
    message: {
        // Message sent when the rate limit is exceeded
        success: false,
        message: "Too many requests, please try again later.",
    },
});

const Router = express.Router();

Router.post(
    "/login",
    loginLimiter, // Apply rate limiting to prevent brute-force attacks
    loginValidator, // Validate user input data for login
    CatchAsync(loginController) // Handle login logic and errors
);

Router.post(
    "/register",
    registerValidator, // Validate user input data for registration
    CatchAsync(registerController) // Handle registration logic and errors
);

Router.post(
    "/register/invite",
    // roleMiddleware([1, 2]),
    invitationValidator,
    CatchAsync(invitationController)
);
Router.get("/roles", CatchAsync(getRoles));
Router.get("/roles/:id", roleIdValidator, CatchAsync(getRole));
Router.post("/roles", async (req, res) => {
    const role = await Role.create(req.body);
    res.status(201).json(role);
});

Router.delete("/roles/:id", async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);

        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        role.destroy();
        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
Router.post("/register/verify", tokenValidator, tokenVerificationController);
Router.post("/password/verify", tokenValidator, tokenVerificationController);
Router.post("/password/forgot", CatchAsync(forgotPasswordController));

Router.post(
    "/password/reset",
    resetPasswordValidator,
    CatchAsync(resetPasswordController)
);
Router.post(
    "/password/reset/me",
    verifyUser,
    myPasswordResetValidator,
    CatchAsync(changePasswordController)
);

module.exports = Router;
