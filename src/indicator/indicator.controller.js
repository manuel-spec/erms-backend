const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");
const {
    createIndicatorService,
    getAllIndicatorsService,
    getIndicatorByIdService,
    updateIndicatorService,
    deleteIndicatorService,
    getAllIndicatorValueTypesService,
    createAllIndicatorValueTypesService,
    updateAllIndicatorValueTypesService,
    deleteAllIndicatorValueTypesService,
} = require("./indicator.service");

const getIndicatorsController = async (req, res) => {
    const {
        page = 1,
        all = false,
        pageSize = 10,
        search = "",
        type,
        category,
    } = req.query;

    const filters = {
        ...(type && { type }),
        ...(category && { category }),
    };

    try {
        const result = await getAllIndicatorsService(
            parseInt(page),
            all,
            parseInt(pageSize),
            search,
            filters
        );
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error("Error fetching indicators:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getIndicatorController = async (req, res) => {
    const indicatorId = req.params.id;
    const result = await getIndicatorByIdService(indicatorId);

    if (_.isEmpty(result)) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Indicator not found" });
    }

    return res.status(StatusCodes.OK).json(result);
};

const postIndicatorController = async (req, res) => {
    const indicatorData = req.validData;

    console.log(indicatorData);
    const result = await createIndicatorService(indicatorData);

    return res.status(StatusCodes.CREATED).json(result);
};

const updateIndicatorController = async (req, res) => {
    const indicatorId = req.params.id;
    const indicatorData = req.body;

    const result = await updateIndicatorService(indicatorId, indicatorData);

    if (_.isEmpty(result)) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Indicator not found" });
    }

    return res
        .status(StatusCodes.OK)
        .json({ message: "Indicator updated successfully", status: true });
};

const deleteIndicatorController = async (req, res) => {
    const indicatorId = req.params.id;
    const result = await deleteIndicatorService(indicatorId);

    if (!result) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Indicator not found" });
    }

    return res
        .status(StatusCodes.OK)
        .json({ message: "Indicator deleted successfully", status: true });
};

const getAllIndicatorValueTypesController = async (req, res) => {
    const result = await getAllIndicatorValueTypesService();
    return res.status(StatusCodes.OK).json(result);
};
const postAllIndicatorValueTypesController = async (req, res) => {
    const indicatorData = req.body;
    const result = await createAllIndicatorValueTypesService(indicatorData);

    return res.status(StatusCodes.CREATED).json(result);
};
const updateAllIndicatorValueTypesController = async (req, res) => {
    const indicatorId = req.params.id;
    const indicatorData = req.body;

    const result = await updateAllIndicatorValueTypesService(
        indicatorId,
        indicatorData
    );

    if (_.isEmpty(result)) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Indicator not found" });
    }
    return res
        .status(StatusCodes.OK)
        .json({ message: "Indicator updated successfully", status: true });
};
const deleteAllIndicatorValueTypesController = async (req, res) => {
    const indicatorId = req.params.id;
    const result = await deleteAllIndicatorValueTypesService(indicatorId);

    if (!result) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Indicator not found" });
    }
    return res
        .status(StatusCodes.OK)
        .json({ message: "Indicator deleted successfully", status: true });
};

const swapIndicatorOrdersController = async (req, res) => {
    const { orders } = req.body; // Extract array of orders from the request body

    try {
        // Pass the orders array to the service to handle the update
        await swapIndicatorOrdersService(orders);

        return res
            .status(StatusCodes.OK)
            .json({ message: "Indicator orders swapped successfully" });
    } catch (error) {
        console.error(error.message);
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: error.message });
    }
};

module.exports = { swapIndicatorOrdersController };

module.exports = {
    getIndicatorsController,
    getIndicatorController,
    postIndicatorController,
    updateIndicatorController,
    deleteIndicatorController,
    getAllIndicatorValueTypesController,
    postAllIndicatorValueTypesController,
    updateAllIndicatorValueTypesController,
    deleteAllIndicatorValueTypesController,
    swapIndicatorOrdersController,
};
