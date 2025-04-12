const { Indicator } = require("./models/indicator.model");
const _ = require("lodash");
const { IndicatorValueType } = require("./models/indicator_value_type.model");
// Removed settings-related import for Type
const { Op, Sequelize } = require("sequelize");

const getAllIndicatorsService = async (
    page = 1,
    all = false,
    pageSize = 10,
    search = "",
    filters = {}
) => {
    const offset = (page - 1) * pageSize;

    const whereClause = {
        ...(search && {
            name: { [Op.like]: `%${search}%` },
        }),
        ...(filters.category && {
            category: { [Op.like]: `%${filters.category}%` },
        }),
    };

    const includeClause = [
        {
            model: IndicatorValueType,
            as: "IndicatorValueType",
            attributes: { exclude: ["deletedAt"] },
        },
        // Removed Type model include since it is settings-related
    ];

    const { rows: indicators, count: totalItems } =
        await Indicator.findAndCountAll({
            where: whereClause,
            attributes: { exclude: ["deletedAt", "value_type", "lab_type"] },
            include: includeClause,
            order: [["order", "ASC"]],
            limit: all ? undefined : pageSize,
            offset: all ? undefined : offset,
        });

    const totalPages = Math.ceil(totalItems / pageSize);

    if (all) return indicators;

    return { indicators, totalItems, totalPages, currentPage: page };
};

const getIndicatorByIdService = async (indicatorId) => {
    const indicator = await Indicator.findByPk(indicatorId, {
        attributes: { exclude: ["deletedAt"] },
    });
    if (_.isEmpty(indicator)) {
        return;
    }
    return { indicator };
};

const createIndicatorService = async (indicatorData) => {
    let newKey = indicatorData.name.toUpperCase().replace(/\s+/g, "");
    indicatorData.key = newKey;

    // Removed filtering based on lab_type since it is settings-related
    const maxOrder = await Indicator.max("order", {
        where: {
            order: {
                [Sequelize.Op.ne]: null,
            },
        },
    });
    const newOrder = maxOrder ? maxOrder + 1 : 1;
    indicatorData.order = newOrder;

    const indicator = await Indicator.create(indicatorData);
    const { deletedAt, ...indicatorWithoutDeletedAt } = indicator.toJSON();

    return { indicatorWithoutDeletedAt };
};

const updateIndicatorService = async (indicatorId, indicatorData) => {
    const indicator = await Indicator.findByPk(indicatorId);
    if (_.isEmpty(indicator)) {
        return;
    }
    await indicator.update(indicatorData);
    return { indicator };
};

const deleteIndicatorService = async (indicatorId) => {
    const indicator = await Indicator.findByPk(indicatorId);
    if (_.isEmpty(indicator)) {
        return false;
    }
    await indicator.destroy();
    return true;
};

const getAllIndicatorValueTypesService = async () => {
    try {
        const indicatorValueTypes = await IndicatorValueType.findAll({
            attributes: { exclude: ["deletedAt"] },
        });
        return { indicatorValueTypes };
    } catch (error) {
        console.log(error);
    }
};

const createAllIndicatorValueTypesService = async (indicatorData) => {
    const indicator = await IndicatorValueType.create(indicatorData);
    return { indicator };
};

const updateAllIndicatorValueTypesService = async (
    indicatorId,
    indicatorData
) => {
    const indicator = await IndicatorValueType.findByPk(indicatorId);
    if (_.isEmpty(indicator)) {
        return;
    }
    await indicator.update(indicatorData);
    return { indicator };
};

const deleteAllIndicatorValueTypesService = async (indicatorId) => {
    const indicator = await IndicatorValueType.findByPk(indicatorId);
    if (_.isEmpty(indicator)) {
        return false;
    }
    await indicator.destroy();
    return true;
};

const swapIndicatorOrdersService = async (orders) => {
    const transaction = await Indicator.sequelize.transaction();
    try {
        for (const { id, newOrder } of orders) {
            const indicator = await Indicator.findByPk(id, { transaction });
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
    createIndicatorService,
    getAllIndicatorsService,
    getIndicatorByIdService,
    updateIndicatorService,
    deleteIndicatorService,
    getAllIndicatorValueTypesService,
    createAllIndicatorValueTypesService,
    updateAllIndicatorValueTypesService,
    deleteAllIndicatorValueTypesService,
    swapIndicatorOrdersService,
};
