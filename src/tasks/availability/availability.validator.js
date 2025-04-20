const {
    body,
    param,
    validationResult,
    matchedData,
} = require("express-validator");

const validatorResponseAV = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    req.validData = matchedData(req);
    next();
};

const createAvailabilityValidator = [
    body("userId").isInt().withMessage("userId must be an integer"),
    body("date").isISO8601().withMessage("date must be YYYY-MM-DD"),
    body("startTime")
        .matches(/^\d{2}:\d{2}:\d{2}$/)
        .withMessage("startTime must be HH:MM:SS"),
    body("endTime")
        .matches(/^\d{2}:\d{2}:\d{2}$/)
        .withMessage("endTime must be HH:MM:SS"),
    body("isAvailable").optional().isBoolean(),
    validatorResponseAV,
];

const updateAvailabilityValidator = [
    param("id").isInt().withMessage("ID must be an integer"),
    ...createAvailabilityValidator,
];

const idValidatorAV = [
    param("id").isInt().withMessage("ID must be an integer"),
    validatorResponseAV,
];

module.exports = {
    createAvailabilityValidator,
    updateAvailabilityValidator,
    idValidatorAV,
};
