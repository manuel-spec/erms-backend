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

const PRIORITIES = ["Low", "Medium", "High"];

const createRepairRequestValidator = [
    body("requestNumber").notEmpty().withMessage("Request number is required"),
    body("requestDate").optional().isISO8601().toDate(),
    body("department").optional().isString(),
    body("requesterName").notEmpty().withMessage("Requester name is required"),
    body("contactPhone").optional().isString(),
    body("deviceName").notEmpty().withMessage("Device name is required"),
    body("deviceModel").optional().isString(),
    body("serialNumber").optional().isString(),
    body("assetNumber").optional().isString(),
    body("problemDescription").optional().isString(),
    body("priority")
        .optional()
        .isIn(PRIORITIES)
        .withMessage(`Priority must be one of: ${PRIORITIES.join(", ")}`),
    validatorResponse,
];
const updateRepairRequestValidator = [
    param("id").isInt().withMessage("ID must be an integer"),
    ...createRepairRequestValidator,
];
const idValidator = [
    param("id").isInt().withMessage("ID must be an integer"),
    validatorResponse,
];

module.exports = {
    createRepairRequestValidator,
    updateRepairRequestValidator,
    idValidator,
};
