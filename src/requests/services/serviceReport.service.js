const { ServiceReport } = require("../models/serviceReport.model.js");
const _ = require("lodash");
const { Op } = require("sequelize");

const getAllServiceReportsService = async (
    page = 1,
    all = false,
    pageSize = 10,
    search = "",
    filters = {}
) => {
    const offset = (page - 1) * pageSize;
    const whereClause = {
        ...(search && { assignedTo: { [Op.like]: `%${search}%` } }),
    };
    const { rows, count: totalItems } = await ServiceReport.findAndCountAll({
        where: whereClause,
        order: [["serviceDate", "DESC"]],
        limit: all ? undefined : pageSize,
        offset: all ? undefined : offset,
    });
    const totalPages = Math.ceil(totalItems / pageSize);
    if (all) return rows;
    return { serviceReports: rows, totalItems, totalPages, currentPage: page };
};

const getServiceReportByIdService = async (id) => {
    const sr = await ServiceReport.findByPk(id);
    if (_.isEmpty(sr)) return;
    return { serviceReport: sr };
};

const createServiceReportService = async (data) => {
    const sr = await ServiceReport.create(data);
    const { deletedAt, ...rest } = sr.toJSON();
    return { serviceReport: rest };
};

const updateServiceReportService = async (id, data) => {
    const sr = await ServiceReport.findByPk(id);
    if (_.isEmpty(sr)) return;
    await sr.update(data);
    return { serviceReport: sr };
};

const deleteServiceReportService = async (id) => {
    const sr = await ServiceReport.findByPk(id);
    if (_.isEmpty(sr)) return false;
    await sr.destroy();
    return true;
};

module.exports = {
    getAllServiceReportsService,
    getServiceReportByIdService,
    createServiceReportService,
    updateServiceReportService,
    deleteServiceReportService,
};
