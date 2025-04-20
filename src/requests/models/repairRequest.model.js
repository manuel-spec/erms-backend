const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database/sequelize.config.js");

const RepairRequest = sequelize.define(
    "RepairRequest",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        requestNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        requestDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        department: { type: DataTypes.STRING, allowNull: true },
        requesterName: { type: DataTypes.STRING, allowNull: false },
        contactPhone: { type: DataTypes.STRING, allowNull: true },
        deviceName: { type: DataTypes.STRING, allowNull: false },
        deviceModel: { type: DataTypes.STRING, allowNull: true },
        serialNumber: { type: DataTypes.STRING, allowNull: true },
        assetNumber: { type: DataTypes.STRING, allowNull: true },
        problemDescription: { type: DataTypes.TEXT, allowNull: true },
        priority: {
            type: DataTypes.ENUM("Low", "Medium", "High"),
            allowNull: false,
            defaultValue: "Medium",
        },
    },
    {
        timestamps: true,
        paranoid: true,
        tableName: "repair_requests",
    }
);

module.exports = { RepairRequest };
