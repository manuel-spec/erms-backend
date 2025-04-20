const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database/sequelize.config.js");
const { User } = require("./user.model.js");
const { Skill } = require("./skill.model.js");

const TechnicianSkill = sequelize.define(
    "TechnicianSkill",
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: User, key: "id" },
            primaryKey: true,
        },
        skillId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Skill, key: "id" },
            primaryKey: true,
        },
    },
    {
        tableName: "technician_skills",
        timestamps: false,
    }
);

User.belongsToMany(Skill, {
    through: TechnicianSkill,
    foreignKey: "userId",
    as: "skills",
});
Skill.belongsToMany(User, {
    through: TechnicianSkill,
    foreignKey: "skillId",
    as: "technicians",
});

module.exports = { TechnicianSkill };
