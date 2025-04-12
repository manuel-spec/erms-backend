const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database/sequelize.config.js");
const { User } = require("../../auth/model/user.model.js");
const { Indicator } = require("./indicator.model.js");

const IndicatorValueType = sequelize.define(
    "IndicatorValueType",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        min: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        max: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);

module.exports = { IndicatorValueType };
