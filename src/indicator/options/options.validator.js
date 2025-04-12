const {
    body,
    param,
    validationResult,
    matchedData,
} = require("express-validator");

const validatorResponse = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    req.validData = matchedData(req);
    next();
};

const createOptionValidator = [
    body("code")
        .notEmpty()
        .withMessage("Code is required")
        .isString()
        .withMessage("Code must be a string"),
    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be a string"),
    body("indicatorId").isInt().withMessage("Indicator ID must be an integer"),

    (req, res, next) => validatorResponse(req, res, next),
];

const updateOptionValidator = [
    param("id").isInt().withMessage("ID must be an integer"),
    body("code").optional().isString().withMessage("Code must be a string"),
    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    body("indicatorId")
        .optional()
        .isInt()
        .withMessage("Indicator ID must be an integer"),

    (req, res, next) => validatorResponse(req, res, next),
];

module.exports = { createOptionValidator, updateOptionValidator };
