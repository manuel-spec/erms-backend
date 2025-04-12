const {
    body,
    validationResult,
    matchedData,
    param,
} = require("express-validator");

const validatorResponse = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    req.validData = matchedData(req);
    next();
};

const createIndicatorValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("value_type").isInt().withMessage("Value type must be an integer"),
    body("lab_type").notEmpty().withMessage("Lab type is required"),

    (req, res, next) => validatorResponse(req, res, next),
];

const updateIndicatorValidator = [
    param("id").isInt().withMessage("ID must be an integer"),
    body("name").optional().isString().withMessage("Name is required"),
    body("value_type")
        .optional()
        .isInt()
        .withMessage("Value type must be an integer"),
    body("lab_type"),

    validatorResponse,
];

const idValidator = [
    param("id").isInt().withMessage("ID must be an integer"),
    validatorResponse,
];

module.exports = {
    createIndicatorValidator,
    updateIndicatorValidator,
    idValidator,
};
