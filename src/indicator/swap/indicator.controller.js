const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");
const { swapIndicatorOrdersService } = require("./indicator.service.js");

const swapIndicatorOrdersController = async (req, res) => {
    const { orders } = req.body;

    try {
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
    swapIndicatorOrdersController,
};
