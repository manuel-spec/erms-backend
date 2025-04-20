const { Assignment } = require("../models/assignment.model.js");
const _ = require("lodash");

const getAllAssignmentsService = async () => {
    return await Assignment.findAll({ order: [["assignedAt", "DESC"]] });
};

const getAssignmentByIdService = async (id) => {
    const assignment = await Assignment.findByPk(id);
    if (_.isEmpty(assignment)) return;
    return assignment;
};

const createAssignmentService = async (data) => {
    const assignment = await Assignment.create(data);
    return assignment;
};

const updateAssignmentService = async (id, data) => {
    const assignment = await Assignment.findByPk(id);
    if (_.isEmpty(assignment)) return;
    await assignment.update(data);
    return assignment;
};

const deleteAssignmentService = async (id) => {
    const assignment = await Assignment.findByPk(id);
    if (_.isEmpty(assignment)) return false;
    await assignment.destroy();
    return true;
};

module.exports = {
    getAllAssignmentsService,
    getAssignmentByIdService,
    createAssignmentService,
    updateAssignmentService,
    deleteAssignmentService,
};
