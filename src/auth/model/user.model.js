const { DataTypes } = require("sequelize");
const { Role } = require("./role.model.js");
const { sequelize } = require("../../config/database/sequelize.config.js");
const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Must be a valid email address",
                },
            },
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        passwordResetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 100],
                    msg: "Password must be at least 6 characters long",
                },
            },
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Role,
                key: "id",
                onDelete: "NO ACTION",
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "active",
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);

User.belongsTo(Role, {
    foreignKey: "roleId",
    as: "role",
});
module.exports = { User };
