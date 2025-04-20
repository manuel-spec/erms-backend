const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database/sequelize.config.js");
const { User } = require("../../auth/model/user.model.js");
const { Skill } = require("./skill.model.js");

const TechnicianSkill = sequelize.define(
    "TechnicianSkill",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: User, key: "id" },
        },
        skillId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Skill, key: "id" },
        },
    },
    {
        tableName: "technician_skills",
        timestamps: false,
    }
);

// 🔽 Add these two explicit belongsTo associations
TechnicianSkill.belongsTo(User, {
    foreignKey: "userId",
    as: "technician",
});
TechnicianSkill.belongsTo(Skill, {
    foreignKey: "skillId",
    as: "skill",
});

// Existing many-to-many mappings (optional, but useful)
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
