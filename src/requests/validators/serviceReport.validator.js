const {
    body,
    param,
    validationResult,
    matchedData,
} = require("express-validator");

const validatorResponseSR = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    req.validData = matchedData(req);
    next();
};

const STATUSES = ["Submitted", "Assigned", "InProgress", "Completed"];
const RATINGS = ["Fully Fixed", "100%", "99%", "90%", "<90%"];

const createServiceReportValidator = [
    body("repairRequestId")
        .isInt()
        .withMessage("repairRequestId must be an integer"),
    body("assignedTo").optional().isInt(),
    body("status")
        .optional()
        .isIn(STATUSES)
        .withMessage(`Status must be one of: ${STATUSES.join(", ")}`),
    body("serviceDate").optional().isISO8601().toDate(),
    body("technicianComments").optional().isString(),
    body("servicePerformed").optional().isString(),
    body("partsUsed").optional().isString(),
    body("finalReadings").optional().isString(),
    body("resultRating")
        .optional()
        .isIn(RATINGS)
        .withMessage(`Result rating must be one of: ${RATINGS.join(", ")}`),
    body("testResults").optional().isArray(),
    body("feedbackRating").optional().isInt(),
    body("feedbackComments").optional().isString(),
    validatorResponseSR,
];
const updateServiceReportValidator = [
    param("id").isInt().withMessage("ID must be an integer"),
    ...createServiceReportValidator,
];
const idValidatorSR = [
    param("id").isInt().withMessage("ID must be an integer"),
    validatorResponseSR,
];

module.exports = {
    createServiceReportValidator,
    updateServiceReportValidator,
    idValidatorSR,
};
