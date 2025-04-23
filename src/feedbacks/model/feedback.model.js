const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database/sequelize.config.js");
const {
    ServiceReport,
} = require("../../requests/models/serviceReport.model.js");
const { User } = require("../../auth/model/user.model.js");

const Feedback = sequelize.define(
    "Feedback",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        // Which service report is this feedback for?
        serviceReportId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ServiceReport,
                key: "id",
            },
            onDelete: "CASCADE",
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: "id",
                onDelete: "SET NULL",
            },
        },
        courtesy: {
            type: DataTypes.ENUM("100%", "90%-99%", "70%-90%", "<70%"),
            allowNull: false,
        },
        communication: {
            type: DataTypes.ENUM("100%", "90%-99%", "70%-90%", "<70%"),
            allowNull: false,
        },
        friendliness: {
            type: DataTypes.ENUM("100%", "90%-99%", "70%-90%", "<70%"),
            allowNull: false,
        },
        professionalism: {
            type: DataTypes.ENUM("100%", "90%-99%", "70%-90%", "<70%"),
            allowNull: false,
        },
        overallSatisfaction: {
            type: DataTypes.ENUM("100%", "90%-99%", "70%-90%", "<70%"),
            allowNull: false,
        },

        // Free-text comments
        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        paranoid: true,
        tableName: "feedbacks",
    }
);

Feedback.belongsTo(ServiceReport, {
    foreignKey: "serviceReportId",
    as: "serviceReport",
});
ServiceReport.hasMany(Feedback, {
    foreignKey: "serviceReportId",
    as: "feedback",
});

Feedback.belongsTo(User, {
    foreignKey: "userId",
    as: "author",
});
User.hasMany(Feedback, {
    foreignKey: "userId",
    as: "givenFeedback",
});

module.exports = { Feedback };
