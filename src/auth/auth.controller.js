const {
    loginService,
    registerService,
    roleService,
    getRoleByIdService,
    profileUpdateService,
    changePasswordService,
} = require("./auth.service.js");
const { User } = require("./model/user.model.js");
const _ = require("lodash");
const CreateError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { transporter } = require("../config/nodeMailer/transporter.js");
require("dotenv").config();
const { forgotPasswordTemplate } = require("../templates/forgot");
const { inviteTemplate } = require("../templates/invite.js");

const loginController = async (req, res, next) => {
    const data = req.validData;
    const result = await loginService(data);

    if (_.isEmpty(result)) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid email or password",
        });
    }

    res.cookie("token", result.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    })
        .status(StatusCodes.OK)
        .json(result);
};

const registerController = async (req, res, next) => {
    const data = req.body;

    const result = await registerService(data);

    if (_.isEmpty(result)) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "User Already Exist With Provided Email" });
    }
    if (result.status == 2) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "You are not Invited" });
    }
    if (result.status == 1) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "User Already Exists" });
    }

    return res.status(StatusCodes.CREATED).json({
        result,
    });
};

const tokenVerificationController = async (req, res, next) => {
    const token = req.validData.token; // Extract token from query parameters
    const secretKey = process.env.JWT_SECRET;

    if (!token) {
        return res
            .status(400)
            .json({ success: false, message: "Token is required" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        return res
            .status(200)
            .json({ success: true, message: "Token is valid", data: decoded });
    } catch (error) {
        // If verification fails, return false
        return res
            .status(401)
            .json({ success: false, message: "Invalid or expired token" });
    }
};

const invitationController = async (req, res, next) => {
    const data = req.validData;
    const user = await User.findOne({ where: { email: data.email } });

    if (!_.isEmpty(user)) {
        return res.status(400).json({
            message: "User already exists",
        });
    }

    const secretKey = process.env.JWT_SECRET;
    const tokenExpiry = "1h";

    const tokenData = {};
    tokenData.email = data.email;
    tokenData.roleId = data.roleId;
    tokenData.positionId = data.positionId;
    tokenData.institutionId = data.institutionId;

    const token = jwt.sign(tokenData, secretKey, {
        expiresIn: tokenExpiry,
    });
    console.log("token", token);

    const invitationLink = `${process.env.Repairs_FRONTEND_URL}/activate?token=${token}`;
    const mail_options = {
        from: "Repairs System <Repairs@sematha.com>",
        to: data.email,
        subject: "You're Invited! Join the AMR Data Management System",
        html: inviteTemplate(invitationLink).html,
    };

    await transporter.sendMail(mail_options);
    res.status(200).send({ message: "Invitation sent successfully!" });
};

const forgotPasswordController = async (req, res, next) => {
    const data = req.body;
    const secretKey = process.env.JWT_SECRET;
    const tokenExpiry = "1h";
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
        return res.status(StatusCodes.OK).send({
            message: "Forgot password sent successfully",
            meta: "no user",
        });
    }

    const token = jwt.sign(
        {
            email: data.email,
        },
        secretKey,
        {
            expiresIn: tokenExpiry,
        }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const mail_options = {
        from: "Electronic Repairs <Repairs@sematha.com>",
        to: data.email,
        subject: "Reset Your Password",
        html: forgotPasswordTemplate(resetLink, user.firstName).html,
    };
    await transporter.sendMail(mail_options);
    res.status(StatusCodes.OK).send({
        message: "Forgot password sent successfully",
    });
};

const resetPasswordController = async (req, res, next) => {
    const token = req.body.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const body = req.validData;

    const updatedUser = await profileUpdateService(email, body);

    if (_.isEmpty(updatedUser))
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "user not found" });
    return res
        .status(StatusCodes.OK)
        .json({ message: "password updated successfully" });
};

const getRoles = async (req, res) => {
    const roles = await roleService();

    if (_.isEmpty(roles)) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "No roles found" });
    }

    return res.status(StatusCodes.OK).json(roles);
};

const getRole = async (req, res) => {
    const data = req.validData;
    const role = await getRoleByIdService(data.id);

    if (_.isEmpty(role)) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Role not found" });
    }

    return res.status(StatusCodes.OK).json(role);
};

const changePasswordController = async (req, res) => {
    try {
        const { email } = req.decoded;

        const { oldPassword, newPassword } = req.validData;

        const result = await changePasswordService(
            email,
            oldPassword,
            newPassword
        );

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        console.error("Error in change password controller:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while changing the password.",
        });
    }
};

module.exports = {
    loginController,
    registerController,
    invitationController,
    tokenVerificationController,
    forgotPasswordController,
    getRoles,
    getRole,
    resetPasswordController,
    changePasswordController,
};
