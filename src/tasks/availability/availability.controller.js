const { StatusCodes } = require("http-status-codes");
const _ = require("lodash");
const {
    getAllAvailabilitiesService,
    getAvailabilityByIdService,
    createAvailabilityService,
    updateAvailabilityService,
    deleteAvailabilityService,
} = require("./availability.service.js");

const getAvailabilitiesController = async (req, res) => {
    try {
        const rows = await getAllAvailabilitiesService();
        return res.status(StatusCodes.OK).json(rows);
    } catch (error) {
        console.error("Error fetching availabilities:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const getAvailabilityController = async (req, res) => {
    const id = req.params.id;
    try {
        const row = await getAvailabilityByIdService(id);
        if (!row)
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Availability not found" });
        return res.status(StatusCodes.OK).json(row);
    } catch (error) {
        console.error("Error fetching availability:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const postAvailabilityController = async (req, res) => {
    const data = req.validData;
    try {
        const row = await createAvailabilityService(data);
        return res.status(StatusCodes.CREATED).json(row);
    } catch (error) {
        console.error("Error creating availability:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const updateAvailabilityController = async (req, res) => {
    const id = req.params.id;
    const data = req.validData;
    try {
        const row = await updateAvailabilityService(id, data);
        if (!row)
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Availability not found" });
        return res
            .status(StatusCodes.OK)
            .json({ message: "Availability updated", row });
    } catch (error) {
        console.error("Error updating availability:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const deleteAvailabilityController = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteAvailabilityService(id);
        if (!result)
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Availability not found" });
        return res
            .status(StatusCodes.OK)
            .json({ message: "Availability deleted" });
    } catch (error) {
        console.error("Error deleting availability:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

module.exports = {
    getAvailabilitiesController,
    getAvailabilityController,
    postAvailabilityController,
    updateAvailabilityController,
    deleteAvailabilityController,
};
