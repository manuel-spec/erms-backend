// models/serviceReport.model.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database/sequelize.config.js");
const { RepairRequest } = require("./repairRequest.model.js");
const { User } = require("../../auth/model/user.model.js");
const ServiceReport = sequelize.define(
    "ServiceReport",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        repairRequestId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: RepairRequest, key: "id" },
        },
        assignedTo: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: "id",
                onDelete: "SET NULL",
            },
        },
        status: {
            type: DataTypes.ENUM(
                "Submitted",
                "Assigned",
                "InProgress",
                "Completed"
            ),
            allowNull: false,
            defaultValue: "Submitted",
        },
        serviceDate: { type: DataTypes.DATEONLY, allowNull: true },
        technicianComments: { type: DataTypes.TEXT, allowNull: true },
        servicePerformed: { type: DataTypes.TEXT, allowNull: true },
        partsUsed: { type: DataTypes.TEXT, allowNull: true },
        finalReadings: { type: DataTypes.TEXT, allowNull: true },
        resultRating: {
            type: DataTypes.ENUM("Fully Fixed", "100%", "99%", "90%", "<90%"),
            allowNull: true,
        },
        testResults: { type: DataTypes.JSON, allowNull: true },
        feedbackRating: { type: DataTypes.INTEGER, allowNull: true },
        feedbackComments: { type: DataTypes.TEXT, allowNull: true },
    },
    {
        timestamps: true,
        paranoid: true,
        tableName: "service_reports",
    }
);

ServiceReport.belongsTo(RepairRequest, { foreignKey: "repairRequestId" });
RepairRequest.hasOne(ServiceReport, { foreignKey: "repairRequestId" });

ServiceReport.belongsTo(User, { foreignKey: "assignedTo", as: "assignee" });
User.hasMany(ServiceReport, { foreignKey: "assignedTo", as: "serviceReports" });

module.exports = { ServiceReport };
