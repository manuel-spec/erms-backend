const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database/sequelize.config.js");
const { RepairRequest } = require("./repairRequest.model.js");
const { User } = require("./user.model.js");

const Assignment = sequelize.define(
    "Assignment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        repairRequestId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: RepairRequest, key: "id" },
        },
        technicianId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: User, key: "id" },
        },
        assignedById: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: User, key: "id" },
        },
        assignedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "assignments",
        timestamps: false,
    }
);

Assignment.belongsTo(RepairRequest, { foreignKey: "repairRequestId" });
RepairRequest.hasMany(Assignment, {
    foreignKey: "repairRequestId",
    as: "assignments",
});

Assignment.belongsTo(User, { foreignKey: "technicianId", as: "technician" });
Assignment.belongsTo(User, { foreignKey: "assignedById", as: "assignedBy" });

module.exports = { Assignment };
