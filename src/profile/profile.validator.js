const { param, validationResult, matchedData } = require("express-validator");

const getProfileValidator = [
    param("id")
        .notEmpty()
        .withMessage("ID is required")
        .isInt()
        .withMessage("ID must be an integer"),

    (req, res, next) => {
        const errors = validationResult(req);

        const extractedErrors = [];
        if (!errors.isEmpty()) {
            errors
                .array()
                .map((err) => extractedErrors.push({ [err.path]: err.msg }));

            return res
                .status(StatusCodes.UNPROCESSABLE_ENTITY)
                .json({ errors: extractedErrors });
        }

        req.validData = matchedData(req);

        next();
    },
];

module.exports = { getProfileValidator };
