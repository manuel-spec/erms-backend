const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");
const {
    getAllTechnicianSkillsService,
    createTechnicianSkillService,
    deleteTechnicianSkillService,
} = require("./technicianSkill.service.js");

const getTechnicianSkillsController = async (req, res) => {
    try {
        const rows = await getAllTechnicianSkillsService();
        return res.status(StatusCodes.OK).json(rows);
    } catch (error) {
        console.error("Error fetching technician skills:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const postTechnicianSkillController = async (req, res) => {
    const data = req.validData;
    try {
        const row = await createTechnicianSkillService(data);
        return res.status(StatusCodes.CREATED).json(row);
    } catch (error) {
        console.error("Error creating technician skill:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const deleteTechnicianSkillController = async (req, res) => {
    const { userId, skillId } = req.params;
    try {
        const result = await deleteTechnicianSkillService(
            parseInt(userId),
            parseInt(skillId)
        );
        if (!result)
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "TechnicianSkill not found" });
        return res
            .status(StatusCodes.OK)
            .json({ message: "Technician skill removed" });
    } catch (error) {
        console.error("Error deleting technician skill:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

module.exports = {
    getTechnicianSkillsController,
    postTechnicianSkillController,
    deleteTechnicianSkillController,
};
