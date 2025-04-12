const { Options } = require("../models/options.model.js");
const { _ } = require("lodash");

const getOptionsService = async (indicatorId) => {
    const filter = {};

    if (indicatorId) {
        filter.indicatorId = indicatorId;
    }

    const options = await Options.findAll({
        where: filter,
        exclude: ["deletedAt"],
    });

    return options;
};

const createOptionsService = async (optionsArray) => {
    const options = await Options.bulkCreate(optionsArray);
    return options;
};

const updateOptionsService = async (id, body) => {
    const option = await Options.findByPk(id);
    // console.log(option);

    if (_.isEmpty(option)) {
        return;
    }

    return await option.update(body);
};

const deleteOptionsService = async (id) => {
    const option = await Options.findByPk(id);

    if (!option) {
        return;
    }

    return await option.destroy();
};

const getOptionService = async (id) => {
    const option = await Options.findByPk(id, {
        exclude: ["deletedAt"],
    });

    if (!option) {
        return;
    }

    return option;
};

module.exports = {
    getOptionsService,
    createOptionsService,
    updateOptionsService,
    deleteOptionsService,
    getOptionService,
};
