const { Indicator } = require("../models/indicator.model");
const _ = require("lodash");

const swapIndicatorOrdersService = async (orders) => {
    const transaction = await Indicator.sequelize.transaction();
    try {
        for (const { id, newOrder } of orders) {
            const indicator = await Indicator.findByPk(id, { transaction });

            console.log("indicator", indicator);
            if (!indicator) {
                throw new Error(`Indicator with ID ${id} not found`);
            }

            await Indicator.update(
                { order: newOrder },
                {
                    where: { id },
                    transaction,
                }
            );
        }
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    swapIndicatorOrdersService,
};
