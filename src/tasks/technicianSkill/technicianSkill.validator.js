const {
    body,
    param,
    validationResult,
    matchedData,
} = require("express-validator");

const validatorResponse = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    req.validData = matchedData(req);
    next();
};

const createTechnicianSkillValidator = [
    body("userId").isInt().withMessage("userId must be an integer"),
    body("skillId").isInt().withMessage("skillId must be an integer"),
    validatorResponse,
];

const idValidatorTS = [
    param("userId").isInt().withMessage("userId must be an integer"),
    param("skillId").isInt().withMessage("skillId must be an integer"),
    validatorResponse,
];

module.exports = { createTechnicianSkillValidator, idValidatorTS };
