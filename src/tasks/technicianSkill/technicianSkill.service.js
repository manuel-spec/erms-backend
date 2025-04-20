const { TechnicianSkill } = require("../models/technicianSkill.model.js");
const _ = require("lodash");

const getAllTechnicianSkillsService = async () => {
    return await TechnicianSkill.findAll();
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
