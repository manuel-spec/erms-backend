const { StatusCodes } = require("http-status-codes");
const {
    getAllFeedbackService,
    getFeedbackByIdService,
    createFeedbackService,
    updateFeedbackService,
    deleteFeedbackService,
} = require("./feedback.service.js");

const getFeedbacksController = async (req, res) => {
    const { page = 1, pageSize = 10, all = false, serviceReportId } = req.query;
    const filters = {};
    if (serviceReportId) filters.serviceReportId = serviceReportId;

    const result = await getAllFeedbackService(
        parseInt(page, 10),
        parseInt(pageSize, 10),
        all === "true" || all === true,
        filters
    );
    return res.status(StatusCodes.OK).json(result);
};

const getFeedbackController = async (req, res) => {
    const { id } = req.params;
    const feedback = await getFeedbackByIdService(id);
    if (!feedback) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Feedback not found" });
    }
    return res.status(StatusCodes.OK).json(feedback);
};

const postFeedbackController = async (req, res) => {
    const payload = req.body;
    const newFeedback = await createFeedbackService(payload);
    return res.status(StatusCodes.CREATED).json(newFeedback);
};

const updateFeedbackController = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const updated = await updateFeedbackService(id, payload);
    if (!updated) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Feedback not found" });
    }
    return res
        .status(StatusCodes.OK)
        .json({ message: "Feedback updated", feedback: updated });
};

const deleteFeedbackController = async (req, res) => {
    const { id } = req.params;
    const deleted = await deleteFeedbackService(id);
    if (!deleted) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Feedback not found" });
    }
    return res.status(StatusCodes.OK).json({ message: "Feedback deleted" });
};

module.exports = {
    getFeedbacksController,
    getFeedbackController,
    postFeedbackController,
    updateFeedbackController,
    deleteFeedbackController,
};
