const { User } = require("./model/user.model.js");
const { Role } = require("./model/role.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const loginService = async (body) => {
    const user = await User.findOne({
        where: { email: body.email },
        attributes: {
            exclude: [
                "roleId",
                ,
                "refreshToken",
                "passwordResetToken",
                "deletedAt",
            ],
        },
        include: [
            {
                model: Role,
                as: "role",
                attributes: ["id", "name"],
            },
        ],
    });

    if (!user) return;

    if (user.status !== "active") {
        return { error: "Account is inactive. Please contact support." };
    }

    // Check if the password is valid
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) return;

    // Generate JWT token
    const token = jwt.sign(
        { id: user.id, role: user.role.id, email: user.email },
        process.env.JWT_SECRET,
        {
            expiresIn: "2d",
        }
    );

    const { password, ...userWithoutPassword } = user.dataValues;

    return { userWithoutPassword, token };
};

const registerService = async (body) => {
    const userExist = await User.findOne({
        where: {
            email: body.email,
        },
    });

    if (userExist) {
        return { message: "User already exists", status: 1 };
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({
        ...body,
        password: hashedPassword,
    });

    const userWithRole = await User.findByPk(user.id, {
        attributes: {
            exclude: ["password", "deletedAt"],
        },
        include: [
            {
                model: Role,
                as: "role",
                attributes: ["id", "name"],
            },
        ],
    });
    console.log(userWithRole);

    return { user: userWithRole };
};

const roleService = async () => {
    const role = await Role.findAll();
    return role;
};

const getRoleByIdService = async (id) => {
    const role = await Role.findByPk(id);

    if (_.isEmpty(role)) return;
    return role;
};

const profileUpdateService = async (email, body) => {
    const hashedPassword = await bcrypt.hash(body.newPassword, 10);

    const user = await User.findOne({
        where: {
            email,
        },

        attributes: { exclude: ["password", "deletedAt"] },
    });

    if (!user) {
        return;
    }

    body.password = hashedPassword;
    await user.update(body);

    return user;
};

const changePasswordService = async (email, oldPassword, newPassword) => {
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return { success: false, message: "User not found." };
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return { success: false, message: "Old password is incorrect." };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return { success: true, message: "Password changed successfully." };
    } catch (error) {
        console.error("Error changing password in service:", error);
        throw new Error("Service error");
    }
};

module.exports = {
    loginService,
    registerService,
    roleService,
    getRoleByIdService,
    profileUpdateService,
    changePasswordService,
};
