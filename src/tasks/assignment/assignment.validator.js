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

const createAssignmentValidator = [
    body("repairRequestId")
        .isInt()
        .withMessage("repairRequestId must be an integer"),
    body("technicianId").isInt().withMessage("technicianId must be an integer"),
    body("assignedById").isInt().withMessage("assignedById must be an integer"),
    body("assignedAt")
        .optional()
        .isISO8601()
        .withMessage("assignedAt must be a valid ISO8601 date"),
    validatorResponse,
];

const updateAssignmentValidator = [
    param("id").isInt().withMessage("ID must be an integer"),
    body("repairRequestId")
        .optional()
        .isInt()
        .withMessage("repairRequestId must be an integer"),
    body("technicianId")
        .optional()
        .isInt()
        .withMessage("technicianId must be an integer"),
    body("assignedById")
        .optional()
        .isInt()
        .withMessage("assignedById must be an integer"),
    body("assignedAt")
        .optional()
        .isISO8601()
        .withMessage("assignedAt must be a valid ISO8601 date"),
    validatorResponse,
];

const idValidator = [
    param("id").isInt().withMessage("ID must be an integer"),
    validatorResponse,
];

module.exports = {
    createAssignmentValidator,
    updateAssignmentValidator,
    idValidator,
};
