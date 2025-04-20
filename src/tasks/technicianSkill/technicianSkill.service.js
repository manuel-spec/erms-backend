const { TechnicianSkill } = require("../models/technicianSkill.model.js");
const { User } = require("../../auth/model/user.model.js");
const { Skill } = require("../models/skill.model.js");
const _ = require("lodash");

const getAllTechnicianSkillsService = async () => {
    return await TechnicianSkill.findAll({
        include: [
            {
                model: User,
                as: "technician",
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: Skill,
                as: "skill",
                attributes: ["id", "name"],
            },
        ],
    });
};

const createTechnicianSkillService = async (data) => {
    return await TechnicianSkill.create(data);
};

const deleteTechnicianSkillService = async (userId, skillId) => {
    const ts = await TechnicianSkill.findOne({ where: { userId, skillId } });
    if (_.isEmpty(ts)) return false;
    await ts.destroy();
    return true;
};

module.exports = {
    getAllTechnicianSkillsService,
    createTechnicianSkillService,
    deleteTechnicianSkillService,
};
