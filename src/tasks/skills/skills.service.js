const { Skill } = require("../models/skill.model.js");
const _ = require("lodash");

const getAllSkillsService = async () => {
    const skills = await Skill.findAll({ order: [["name", "ASC"]] });
    return skills;
};

const getSkillByIdService = async (id) => {
    const skill = await Skill.findByPk(id);
    if (_.isEmpty(skill)) return;
    return skill;
};

const createSkillService = async (data) => {
    const skill = await Skill.create(data);
    return skill;
};

const updateSkillService = async (id, data) => {
    const skill = await Skill.findByPk(id);
    if (_.isEmpty(skill)) return;
    await skill.update(data);
    return skill;
};

const deleteSkillService = async (id) => {
    const skill = await Skill.findByPk(id);
    if (_.isEmpty(skill)) return false;
    await skill.destroy();
    return true;
};

module.exports = {
    getAllSkillsService,
    getSkillByIdService,
    createSkillService,
    updateSkillService,
    deleteSkillService,
};
