const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");
const {
    getAllAssignmentsService,
    getAssignmentByIdService,
    createAssignmentService,
    updateAssignmentService,
    deleteAssignmentService,
} = require("./assignment.service.js");

const getAssignmentsController = async (req, res) => {
    try {
        const rows = await getAllAssignmentsService();
        return res.status(StatusCodes.OK).json(rows);
    } catch (error) {
        console.error("Error fetching assignments:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const getAssignmentController = async (req, res) => {
    const id = req.params.id;
    try {
        const assignment = await getAssignmentByIdService(id);
        if (_.isEmpty(assignment))
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Assignment not found" });
        return res.status(StatusCodes.OK).json(assignment);
    } catch (error) {
        console.error("Error fetching assignment:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const postAssignmentController = async (req, res) => {
    const data = req.validData;
    try {
        const assignment = await createAssignmentService(data);
        return res.status(StatusCodes.CREATED).json(assignment);
    } catch (error) {
        console.error("Error creating assignment:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const updateAssignmentController = async (req, res) => {
    const id = req.params.id;
    const data = req.validData;
    try {
        const assignment = await updateAssignmentService(id, data);
        if (_.isEmpty(assignment))
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Assignment not found" });
        return res
            .status(StatusCodes.OK)
            .json({ message: "Assignment updated successfully", assignment });
    } catch (error) {
        console.error("Error updating assignment:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const deleteAssignmentController = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteAssignmentService(id);
        if (!result)
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Assignment not found" });
        return res
            .status(StatusCodes.OK)
            .json({ message: "Assignment deleted successfully" });
    } catch (error) {
        console.error("Error deleting assignment:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

module.exports = {
    getAssignmentsController,
    getAssignmentController,
    postAssignmentController,
    updateAssignmentController,
    deleteAssignmentController,
};
