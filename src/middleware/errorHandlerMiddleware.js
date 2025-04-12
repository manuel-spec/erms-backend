const errorHandlerMiddleware = (err, req, res, next) => {
    res.json({
        error: {
            message: err.message,
            status: err.status,
        },
    });

    res.status(err.status || 500).json({
        error: {
            message: err.message || "Internal Server Error",
            ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
        },
    });
};

module.exports = { errorHandlerMiddleware };
