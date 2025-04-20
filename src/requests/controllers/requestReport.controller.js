const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");
const {
    createRepairRequestService,
    getAllRepairRequestsService,
    getRepairRequestByIdService,
    updateRepairRequestService,
    deleteRepairRequestService,
} = require("../services/repairRequest.service.js");

const getRepairRequestsController = async (req, res) => {
    const { page = 1, all = false, pageSize = 10, search = "" } = req.query;
    const filters = {};
    try {
        const result = await getAllRepairRequestsService(
            parseInt(page, 10),
            all === "true" || all === true,
            parseInt(pageSize, 10),
            search,
            filters
        );
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error("Error fetching repair requests:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const getRepairRequestController = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await getRepairRequestByIdService(id);
        if (_.isEmpty(result)) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Repair request not found" });
        }
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error("Error fetching repair request:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const postRepairRequestController = async (req, res) => {
    const data = req.validData;
    try {
        const result = await createRepairRequestService(data);
        return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        console.error("Error creating repair request:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const updateRepairRequestController = async (req, res) => {
    const id = req.params.id;
    const data = req.validData || req.body;
    try {
        const result = await updateRepairRequestService(id, data);
        if (_.isEmpty(result)) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Repair request not found" });
        }
        return res.status(StatusCodes.OK).json({
            message: "Repair request updated successfully",
            status: true,
        });
    } catch (error) {
        console.error("Error updating repair request:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const deleteRepairRequestController = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteRepairRequestService(id);
        if (!result) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Repair request not found" });
        }
        return res.status(StatusCodes.OK).json({
            message: "Repair request deleted successfully",
            status: true,
        });
    } catch (error) {
        console.error("Error deleting repair request:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

module.exports = {
    getRepairRequestsController,
    getRepairRequestController,
    postRepairRequestController,
    updateRepairRequestController,
    deleteRepairRequestController,
};
