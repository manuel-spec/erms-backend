const { StatusCodes } = require("http-status-codes");
const {
    getProfileService,
    profileUpdateService,
    profileDeleteService,
    getProfilesService,
    deleteUserService,
    updateUserService,
} = require("./profile.service.js");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const getProfileController = async (req, res) => {
    const id = req.decoded.id;
    const profile = await getProfileService(id);

    if (_.isEmpty(profile)) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Profile not found" });
    }
    return res.status(StatusCodes.OK).json({ profile });
};

const profileUpdateController = async (req, res) => {
    const data = req.validData;
    const body = req.body;

    if (req.file) {
        console.log(req.file);
        body.profileImage = req.file.filename;
    }
    const id = req.decoded.id;

    const profile = await profileUpdateService(id, data, body);

    if (_.isEmpty(profile)) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Profile not found" });
    }
    return res
        .status(StatusCodes.OK)
        .json({ message: "Profile updated successfully" });
};

const profileDeleteController = async (req, res) => {
    const id = req.decoded.id;
    const profile = await profileDeleteService(id);

    if (!profile) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Profile not found" });
    }
    return res
        .status(StatusCodes.OK)
        .json({ message: "Profile deleted successfully" });
};

const getProfilesController = async (req, res) => {
    const {
        page = 1,
        pageSize = 10,
        search = "",
        roleId = null,
        status = null,
    } = req.query;

    const result = await getProfilesService(
        req.user.email,
        parseInt(page),
        parseInt(pageSize),
        search,
        roleId,
        status
    );

    return res.status(StatusCodes.OK).json(result);
};

const deleteUserController = async (req, res) => {
    const id = req.decoded.id;
    const UserId = req.params.id;

    if (req.decoded.role != 1)
        return res
            .status(StatusCodes.FORBIDDEN)
            .json({ message: "unauthorized" });

    const profile = await deleteUserService(UserId);

    if (!profile) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Profile not found" });
    }
    return res
        .status(StatusCodes.OK)
        .json({ message: "Profile deleted successfully" });
};
const updateUserController = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if (req.decoded.role != 1)
        return res
            .status(StatusCodes.FORBIDDEN)
            .json({ message: "unauthorized" });

    const profile = await updateUserService(id, body);

    if (_.isEmpty(profile)) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Profile not found" });
    }
    return res
        .status(StatusCodes.OK)
        .json({ message: "Profile updated successfully" });
};

module.exports = {
    getProfileController,
    profileUpdateController,
    profileDeleteController,
    getProfilesController,
    deleteUserController,
    updateUserController,
};
