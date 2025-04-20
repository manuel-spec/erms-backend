const { RepairRequest } = require("../models/repairRequest.model.js");
const _ = require("lodash");
const { Op } = require("sequelize");

const getAllRepairRequestsService = async (
    page = 1,
    all = false,
    pageSize = 10,
    search = "",
    filters = {}
) => {
    const offset = (page - 1) * pageSize;
    const whereClause = {
        ...(search && {
            [Op.or]: [
                { requesterName: { [Op.like]: `%${search}%` } },
                { deviceName: { [Op.like]: `%${search}%` } },
            ],
        }),
        ...(filters.priority && { priority: filters.priority }),
    };
    const { rows, count: totalItems } = await RepairRequest.findAndCountAll({
        where: whereClause,
        order: [["requestDate", "DESC"]],
        limit: all ? undefined : pageSize,
        offset: all ? undefined : offset,
    });
    const totalPages = Math.ceil(totalItems / pageSize);
    if (all) return rows;
    return { repairRequests: rows, totalItems, totalPages, currentPage: page };
};

const getRepairRequestByIdService = async (id) => {
    const req = await RepairRequest.findByPk(id);
    if (_.isEmpty(req)) return;
    return { repairRequest: req };
};

const createRepairRequestService = async (data) => {
    const req = await RepairRequest.create(data);
    const { deletedAt, ...rest } = req.toJSON();
    return { repairRequest: rest };
};

const updateRepairRequestService = async (id, data) => {
    const req = await RepairRequest.findByPk(id);
    if (_.isEmpty(req)) return;
    await req.update(data);
    return { repairRequest: req };
};

const deleteRepairRequestService = async (id) => {
    const req = await RepairRequest.findByPk(id);
    if (_.isEmpty(req)) return false;
    await req.destroy();
    return true;
};

module.exports = {
    getAllRepairRequestsService,
    getRepairRequestByIdService,
    createRepairRequestService,
    updateRepairRequestService,
    deleteRepairRequestService,
};
