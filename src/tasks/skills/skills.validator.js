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

const createSkillValidator = [
    body("name")
        .notEmpty()
        .withMessage("Skill name is required")
        .isString()
        .withMessage("Skill name must be a string"),
    validatorResponse,
];

const updateSkillValidator = [
    param("id").isInt().withMessage("ID must be an integer"),
    body("name")
        .optional()
        .isString()
        .withMessage("Skill name must be a string"),
    validatorResponse,
];

const idValidator = [
    param("id").isInt().withMessage("ID must be an integer"),
    validatorResponse,
];

module.exports = { createSkillValidator, updateSkillValidator, idValidator };
