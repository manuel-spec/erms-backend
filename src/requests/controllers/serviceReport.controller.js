const {
    createServiceReportService,
    getAllServiceReportsService,
    getServiceReportByIdService,
    updateServiceReportService,
    deleteServiceReportService,
} = require("../services/serviceReport.service.js");

const getServiceReportsController = async (req, res) => {
    const { page = 1, all = false, pageSize = 10, search = "" } = req.query;
    const filters = {};
    try {
        const result = await getAllServiceReportsService(
            parseInt(page, 10),
            all === "true" || all === true,
            parseInt(pageSize, 10),
            search,
            filters
        );
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error("Error fetching service reports:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const getServiceReportController = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await getServiceReportByIdService(id);
        if (_.isEmpty(result)) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Service report not found" });
        }
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error("Error fetching service report:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const postServiceReportController = async (req, res) => {
    const data = req.validData;
    try {
        const result = await createServiceReportService(data);
        return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        console.error("Error creating service report:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const updateServiceReportController = async (req, res) => {
    const id = req.params.id;
    const data = req.validData || req.body;
    try {
        const result = await updateServiceReportService(id, data);
        if (_.isEmpty(result)) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Service report not found" });
        }
        return res.status(StatusCodes.OK).json({
            message: "Service report updated successfully",
            status: true,
        });
    } catch (error) {
        console.error("Error updating service report:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

const deleteServiceReportController = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteServiceReportService(id);
        if (!result) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Service report not found" });
        }
        return res.status(StatusCodes.OK).json({
            message: "Service report deleted successfully",
            status: true,
        });
    } catch (error) {
        console.error("Error deleting service report:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: error.message });
    }
};

module.exports = {
    getServiceReportsController,
    getServiceReportController,
    postServiceReportController,
    updateServiceReportController,
    deleteServiceReportController,
};
