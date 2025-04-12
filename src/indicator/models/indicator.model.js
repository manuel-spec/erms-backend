const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database/sequelize.config.js");
const { IndicatorValueType } = require("./indicator_value_type.model.js");

const Indicator = sequelize.define(
    "Indicator",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        value_type: {
            type: DataTypes.INTEGER,
            references: {
                model: IndicatorValueType,
                key: "id",
            },
        },

        options: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue("options");
                return rawValue ? JSON.parse(rawValue) : [];
            },
            set(val) {
                this.setDataValue("options", JSON.stringify(val));
            },
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parentIndicator: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        derivedFrom: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        paranoid: true,
    }
);

Indicator.belongsTo(IndicatorValueType, {
    foreignKey: "value_type",
    as: "IndicatorValueType",
});

module.exports = { Indicator };
