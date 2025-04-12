const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database/sequelize.config.js");
const { Indicator } = require("./indicator.model.js");

const Options = sequelize.define(
    "Options",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        indicatorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Indicator,
                key: "id",
            },
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);
Options.belongsTo(Indicator, {
    foreignKey: "indicatorId",
    onDelete: "CASCADE",
});

module.exports = { Options };
