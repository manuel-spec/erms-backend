const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database/sequelize.config.js");
const { User } = require("../../auth/model/user.model.js");
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
        buildingBlockNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bureoNumber: {
            type: DataTypes.STRING,
            allowNull: true,
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
    },
    {
        timestamps: true,
        paranoid: true,
        tableName: "repair_requests",
    }
);

RepairRequest.belongsTo(User, { foreignKey: "userId" });

module.exports = { RepairRequest };
