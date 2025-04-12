const { User } = require("../auth/model/user.model.js");
const { Role } = require("../auth/model/role.model.js");
const { Op } = require("sequelize");

const getProfileService = async (id) => {
    const user = await User.findByPk(id, {
        attributes: {
            exclude: ["roleId", "password", "deletedAt"],
        },
        include: [
            {
                model: Role,
                as: "role",
                attributes: ["id", "name"],
            },
        ],
    });

    if (!user) {
        return;
    }
    const { passwordResetToken, refreshToken, ...userWithoutPassword } =
        user.dataValues;

    return userWithoutPassword;
};

const profileUpdateService = async (id, data, body) => {
    const user = await User.findByPk(id, {
        attributes: {
            exclude: ["roleId", "password", "deletedAt"],
        },
        include: [
            {
                model: Role,
                as: "role",
                attributes: ["id", "name"],
            },
        ],
    });

    if (!user) {
        return;
    }

    if (body.password) {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        body.password = await bcrypt.hash(body.password, salt); // Hash the password
    }

    await user.update(body);

    return user;
};

const profileDeleteService = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
        return;
    }

    await user.destroy();

    return user;
};

const getProfilesService = async (
    email,
    page = 1,
    pageSize = 10,
    search = "",
    roleId = null,
    status = null
) => {
    const offset = (page - 1) * pageSize;

    const searchFilter = search
        ? {
              [Op.or]: [
                  { firstName: { [Op.like]: `%${search}%` } },
                  { middleName: { [Op.like]: `%${search}%` } },
                  { lastName: { [Op.like]: `%${search}%` } },
                  { email: { [Op.like]: `%${search}%` } },
              ],
          }
        : {};
    const roleFilter = roleId ? { roleId: roleId } : {};

    const statusFilter = status !== null ? { status: status } : {};

    const { rows: users, count: totalItems } = await User.findAndCountAll({
        where: {
            ...searchFilter,
            ...roleFilter,
            ...statusFilter,
        },
        attributes: {
            exclude: ["roleId", "password", "deletedAt"],
        },
        include: [
            {
                model: Role,
                as: "role",
                attributes: ["id", "name"],
            },
        ],
        limit: pageSize,
        offset: offset,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
        users,
        totalItems,
        totalPages,
        currentPage: page,
    };
};

const deleteUserService = async (id) => {
    const user = await User.findByPk(id);

    if (!user) return;

    await user.destroy();
    return true;
};

const updateUserService = async (id, body) => {
    return await User.update(body, {
        where: { id: id },
    });
};

module.exports = {
    getProfileService,
    profileUpdateService,
    profileDeleteService,
    getProfilesService,
    deleteUserService,
    updateUserService,
};
