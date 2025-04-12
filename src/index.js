// const { sequelize } = require("./config/database/sequelize.config.js");
const { sequelize } = require("./config/database/sequelize.config.js");
const {
    errorHandlerMiddleware,
} = require("./middleware/errorHandlerMiddleware.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const express = require("express");
const sanitize = require("sanitize");
const router = require("./routes.js");
const CreateError = require("http-errors");
const passport = require("passport");
const sswaggerDocs = require("../utils/swagger.js");
require("./config/passport/passport.config.js");
const { StatusCodes } = require("http-status-codes");
const swaggerDocs = require("../utils/swagger.js");
// associations
// require("./settings/city/model/association.js");
// require("./associations.js");
const cron = require("node-cron");
dotenv.config();

// Create Express application
const app = express();
// Set port from environment variable or default to 9000
const port = process.env.PORT || 9000;

// Use Helmet for security headers
// app.use(helmet());

// CORS middleware with allowed origins
// const whitelist = process.env.ALLOWED_URLs ;
const whitelist = ["http://localhost:3000", "http://localhost:5173"];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

// Enable CORS
app.use(cors(corsOptions));

app.use(sanitize.middleware);

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

swaggerDocs(app, port);

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({
        status: true,
        message:
            "Repairs System API is up and running., visit /docs for more info.",
    });
});

app.use("/v1", router);

app.all("*", (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
        status: false,
        message: "The URL you've requested is not valid.",
    });
});

// error handlers middleware
app.use(errorHandlerMiddleware);

const startAPI = async (PORT) => {
    try {
        await sequelize.authenticate();
        console.info(`🔐 Database authenticated successfully!`);

        if (process.env.NODE_ENV === "production") {
            // Sync models without altering existing tables and data
            await sequelize.sync({ alter: true });
            console.info(`♻️  Database model synced in production ...`);
        }
        console.info(`♻️  Database model synced ...`);
        // server listen for incoming HTTP requests on  a specified port
        app.listen(PORT, () => console.info(`🚀 API running on port ${PORT}`));
    } catch (error) {
        console.log(error.stack);
        //unhandled promise rejection
        console.error(`❌ Error Happened : ${error}`);
    }
};

startAPI(port);
