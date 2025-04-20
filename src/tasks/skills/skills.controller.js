const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");
const {
    getAllSkillsService,
    getSkillByIdService,
    createSkillService,
    updateSkillService,
    deleteSkillService,
} = require("./skills.service.js");

const getSkillsController = async (req, res) => {
    try {
        const skills = await getAllSkillsService();
        return res.status(StatusCodes.OK).json(skills);
    } catch (error) {
        console.error("Error fetching skills:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const getSkillController = async (req, res) => {
    const id = req.params.id;
    try {
        const skill = await getSkillByIdService(id);
        if (_.isEmpty(skill)) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Skill not found" });
        }
        return res.status(StatusCodes.OK).json(skill);
    } catch (error) {
        console.error("Error fetching skill:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const postSkillController = async (req, res) => {
    const data = req.validData;
    try {
        const skill = await createSkillService(data);
        return res.status(StatusCodes.CREATED).json(skill);
    } catch (error) {
        console.error("Error creating skill:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const updateSkillController = async (req, res) => {
    const id = req.params.id;
    const data = req.validData;
    try {
        const skill = await updateSkillService(id, data);
        if (_.isEmpty(skill)) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Skill not found" });
        }
        return res
            .status(StatusCodes.OK)
            .json({ message: "Skill updated successfully", skill });
    } catch (error) {
        console.error("Error updating skill:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const deleteSkillController = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteSkillService(id);
        if (!result) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Skill not found" });
        }
        return res
            .status(StatusCodes.OK)
            .json({ message: "Skill deleted successfully" });
    } catch (error) {
        console.error("Error deleting skill:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

module.exports = {
    getSkillsController,
    getSkillController,
    postSkillController,
    updateSkillController,
    deleteSkillController,
};
