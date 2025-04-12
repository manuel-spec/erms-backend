const {
    getOptionService,
    getOptionsService,
    createOptionsService,
    updateOptionsService,
    deleteOptionsService,
} = require("./options.service.js");
const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");

const getOptionsController = async (req, res) => {
    const { indicatorId } = req.query;
    const options = await getOptionsService(indicatorId);

    return res.status(200).json({
        status: StatusCodes.OK,
        data: options,
    });
};

const createOptionsController = async (req, res) => {
    const body = req.body;

    const options = await createOptionsService(body);

    if (_.isEmpty(options)) {
        return res.status(400).json({
            status: StatusCodes.BAD_REQUEST,
            message: "Failed to create options",
        });
    }
    return res.status(201).json({
        status: StatusCodes.CREATED,
        data: options,
    });
};

const updateOptionsController = async (req, res) => {
    const body = req.validData;
    const { id } = req.params;
    console.log(body);

    const options = await updateOptionsService(id, body);
    console.log(options);

    if (_.isEmpty(options)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Failed to update options",
        });
    }
    return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: options,
    });
};

const deleteOptionsController = (req, res) => {
    const { id } = req.params;

    const options = deleteOptionsService(id);

    if (_.isEmpty(options)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Failed to delete options",
        });
    }
    return res.status(StatusCodes.OK).json({
        data: options,
    });
};

const getOptionController = (req, res) => {
    const { id } = req.params;

    const option = getOptionService(id);

    if (_.isEmpty(option)) {
        return res.status(404).json({
            status: StatusCodes.NOT_FOUND,
            message: "Option not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: option,
    });
};

module.exports = {
    getOptionsController,
    createOptionsController,
    updateOptionsController,
    deleteOptionsController,
    getOptionController,
};
