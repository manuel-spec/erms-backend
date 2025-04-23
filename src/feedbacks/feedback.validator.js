const {
    body,
    param,
    validationResult,
    matchedData,
    oneOf,
} = require("express-validator");

const validatorResponse = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    req.validData = matchedData(req);
    next();
};

// Your four rating bands
const RATINGS = ["100%", "90%-99%", "70%-90%", "<70%"];

const createTechnicianFeedbackValidator = [
    body("serviceReportId")
        .isInt({ gt: 0 })
        .withMessage("serviceReportId must be a positive integer"),
    body("userId")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("userId, if provided, must be a positive integer"),

    // Behavioral criteria
    body("courtesy")
        .isIn(RATINGS)
        .withMessage(`courtesy must be one of: ${RATINGS.join(", ")}`),
    body("communication")
        .isIn(RATINGS)
        .withMessage(`communication must be one of: ${RATINGS.join(", ")}`),
    body("friendliness")
        .isIn(RATINGS)
        .withMessage(`friendliness must be one of: ${RATINGS.join(", ")}`),
    body("professionalism")
        .isIn(RATINGS)
        .withMessage(`professionalism must be one of: ${RATINGS.join(", ")}`),
    body("overallSatisfaction")
        .isIn(RATINGS)
        .withMessage(
            `overallSatisfaction must be one of: ${RATINGS.join(", ")}`
        ),

    body("comments")
        .optional()
        .isString()
        .withMessage("comments must be a string"),

    validatorResponse,
];

// For updates: require a valid id and at least one updatable field
const updateTechnicianFeedbackValidator = [
    param("id").isInt({ gt: 0 }).withMessage("ID must be a positive integer"),

    // at least one field present
    oneOf(
        [
            body("courtesy").exists(),
            body("communication").exists(),
            body("friendliness").exists(),
            body("professionalism").exists(),
            body("overallSatisfaction").exists(),
            body("comments").exists(),
        ],
        "At least one feedback field must be provided"
    ),

    // then validate any that are present
    body("courtesy")
        .optional()
        .isIn(RATINGS)
        .withMessage(`courtesy must be one of: ${RATINGS.join(", ")}`),
    body("communication")
        .optional()
        .isIn(RATINGS)
        .withMessage(`communication must be one of: ${RATINGS.join(", ")}`),
    body("friendliness")
        .optional()
        .isIn(RATINGS)
        .withMessage(`friendliness must be one of: ${RATINGS.join(", ")}`),
    body("professionalism")
        .optional()
        .isIn(RATINGS)
        .withMessage(`professionalism must be one of: ${RATINGS.join(", ")}`),
    body("overallSatisfaction")
        .optional()
        .isIn(RATINGS)
        .withMessage(
            `overallSatisfaction must be one of: ${RATINGS.join(", ")}`
        ),
    body("comments")
        .optional()
        .isString()
        .withMessage("comments must be a string"),

    validatorResponse,
];

const technicianFeedbackIdValidator = [
    param("id").isInt({ gt: 0 }).withMessage("ID must be a positive integer"),
    validatorResponse,
];

module.exports = {
    createTechnicianFeedbackValidator,
    updateTechnicianFeedbackValidator,
    technicianFeedbackIdValidator,
};
