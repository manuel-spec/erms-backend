const { Role } = require("../../auth/model/role.model");
const { User } = require("../../auth/model/user.model.js");

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

    return user;
};

module.exports = { getProfileService };
