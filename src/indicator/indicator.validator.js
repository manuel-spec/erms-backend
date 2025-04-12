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
    body("lab_type")
        .optional()
        .isInt()
        .withMessage("Lab type must be an integer"),
    body("lab").optional().isInt().withMessage("Lab must be an integer"),
    body("options")
        .optional()
        .isArray()
        .withMessage("Options must be an array"),
    body("order").optional().isInt().withMessage("Order must be an integer"),
    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be a string"),
    body("category")
        .notEmpty()
        .withMessage("Category is required")
        .isString()
        .withMessage("Category must be a string"),
    body("parentIndicator")
        .optional()
        .isString()
        .withMessage("Parent indicator must be a string"),
    body("derivedFrom")
        .optional()
        .isString()
        .withMessage("Derived from must be a string"),
    body("key").optional().isString().withMessage("Key must be a string"),

    (req, res, next) => validatorResponse(req, res, next),
];

// Validator for updating an existing indicator
const updateIndicatorValidator = [
    param("id").isInt().withMessage("ID must be an integer"),
    body("name").optional().isString().withMessage("Name must be a string"),
    body("value_type")
        .optional()
        .isInt()
        .withMessage("Value type must be an integer"),
    body("lab_type")
        .optional()
        .isInt()
        .withMessage("Lab type must be an integer"),
    body("lab").optional().isInt().withMessage("Lab must be an integer"),
    body("options")
        .optional()
        .isArray()
        .withMessage("Options must be an array"),
    body("order").optional().isInt().withMessage("Order must be an integer"),
    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    body("category")
        .optional()
        .isString()
        .withMessage("Category must be a string"),
    body("parentIndicator")
        .optional()
        .isString()
        .withMessage("Parent indicator must be a string"),
    body("derivedFrom")
        .optional()
        .isString()
        .withMessage("Derived from must be a string"),
    body("key").optional().isString().withMessage("Key must be a string"),

    (req, res, next) => validatorResponse(req, res, next),
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
