const { Feedback } = require("./model/feedback.model.js");
const { Op } = require("sequelize");

async function getAllFeedbackService(page, pageSize, all, filters) {
    const offset = (page - 1) * pageSize;
    const where = {};

    // apply any incoming filters (e.g. serviceReportId)
    Object.entries(filters).forEach(([key, val]) => {
        if (val != null) where[key] = val;
    });

    const query = {
        where,
        order: [["createdAt", "DESC"]],
        ...(all ? {} : { limit: pageSize, offset }),
    };

    const { rows, count } = await Feedback.findAndCountAll(query);

    if (all) return rows;

    const totalPages = Math.ceil(count / pageSize);
    return {
        feedbacks: rows,
        totalItems: count,
        totalPages,
        currentPage: page,
    };
}

async function getFeedbackByIdService(id) {
    return Feedback.findByPk(id);
}

async function createFeedbackService(data) {
    const fb = await Feedback.create(data);
    return fb;
}

async function updateFeedbackService(id, data) {
    const fb = await Feedback.findByPk(id);
    if (!fb) return null;
    await fb.update(data);
    return fb;
}

async function deleteFeedbackService(id) {
    const fb = await Feedback.findByPk(id);
    if (!fb) return false;
    await fb.destroy();
    return true;
}

module.exports = {
    getAllFeedbackService,
    getFeedbackByIdService,
    createFeedbackService,
    updateFeedbackService,
    deleteFeedbackService,
};
