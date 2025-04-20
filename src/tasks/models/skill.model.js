const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database/sequelize.config.js");

const Skill = sequelize.define(
    "Skill",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: "skills",
        timestamps: false,
    }
);

module.exports = { Skill };
