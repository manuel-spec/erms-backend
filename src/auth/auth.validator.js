const {
    body,
    validationResult,
    matchedData,
    param,
} = require("express-validator");
const CreateError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

const loginValidator = [
    // Validate the 'email' field to ensure it is a valid email address
    body("email").isEmail().withMessage("Please provide a valid email address"),

    // Validate the 'password' field to ensure it is not empty
    body("password").not().isEmpty().withMessage("Password is required"),

    /**
     * Custom middleware to check for validation errors.
     * If errors exist, they are combined into a single message and thrown as a BadRequestError.
     * Otherwise, the request is passed to the next middleware or controller.
     */
    (req, res, next) => {
        const errors = validationResult(req); // Get validation result from express-validator

        const extractedErrors = [];

        // If validation errors exist, throw a BadRequestError with combined error messages
        if (!errors.isEmpty()) {
            errors
                .array()
                .map((err) => extractedErrors.push({ [err.path]: err.msg }));

            return res
                .status(StatusCodes.UNPROCESSABLE_ENTITY)
                .json({ errors: extractedErrors });
        }

        req.validData = matchedData(req); // Extract the validated data from the request

        next(); // Pass to the next middleware/controller if no errors
    },
];

const registerValidator = [
    body("firstName"),
    body("middleName"),
    body("lastName"),
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password"),
    body("roleId"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((err) => err.msg);
            return res.status(400).json({ errorMessages });
        }

        req.validData = matchedData(req);
        next();
    },
];

const invitationValidator = [
    body("email")
        .notEmpty()
        .withMessage("email is required !")
        .isEmail()
        .withMessage("valid email is required !"),

    body("roleId")
        .notEmpty()
        .withMessage("RoleId is required !")
        .isInt()
        .withMessage("RoleId should be an integer"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((err) => err.msg);
            return res.status(400).json({ errorMessages });
        }
        req.validData = matchedData(req);
        next();
    },
];

const tokenValidator = [
    body("token").notEmpty().withMessage("Token is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((err) => err.msg);
            return res.status(400).json({ errorMessages });
        }
        req.validData = matchedData(req);
        next();
    },
];

const roleIdValidator = [
    param("id")
        .not()
        .isEmpty()
        .withMessage("ID is required")
        .isInt()
        .withMessage("ID should be an integer"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((err) => err.msg);
            return res.status(400).json({ errorMessages });
        }
        req.validData = matchedData(req);
        next();
    },
];

const emailValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email address"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((err) => err.msg);
            return res.status(400).json({ errorMessages });
        }
        req.validData = matchedData(req);
        next();
    },
];

const resetPasswordValidator = [
    body("newPassword")
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters long"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((err) => err.msg);
            return res.status(400).json({ errorMessages });
        }
        req.validData = matchedData(req);
        next();
    },
];
const myPasswordResetValidator = [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword")
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters long"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((err) => err.msg);
            return res.status(400).json({ errorMessages });
        }
        req.validData = matchedData(req);
        next();
    },
];

module.exports = {
    loginValidator,
    registerValidator,
    invitationValidator,
    tokenValidator,
    roleIdValidator,
    emailValidator,
    resetPasswordValidator,
    myPasswordResetValidator,
};
