const { Availability } = require("../models/availability.model.js");
const _ = require("lodash");

const getAllAvailabilitiesService = async () => await Availability.findAll();
const getAvailabilityByIdService = async (id) => {
    const av = await Availability.findByPk(id);
    if (_.isEmpty(av)) return;
    return av;
};
const createAvailabilityService = async (data) =>
    await Availability.create(data);
const updateAvailabilityService = async (id, data) => {
    const av = await Availability.findByPk(id);
    if (_.isEmpty(av)) return;
    await av.update(data);
    return av;
};
const deleteAvailabilityService = async (id) => {
    const av = await Availability.findByPk(id);
    if (_.isEmpty(av)) return false;
    await av.destroy();
    return true;
};

module.exports = {
    getAllAvailabilitiesService,
    getAvailabilityByIdService,
    createAvailabilityService,
    updateAvailabilityService,
    deleteAvailabilityService,
};
