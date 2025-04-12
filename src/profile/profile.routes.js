const express = require("express");
const path = require("path");
const { CatchAsync } = require("../../utils/catchAsync");
const { verifyUser } = require("../middleware/tokenHandlerMiddleware.js");

const {
    getProfileController,
    profileUpdateController,
    profileDeleteController,
    getProfilesController,
    deleteUserController,
    updateUserController,
} = require("./profile.controller.js");
const { roleMiddleware } = require("../middleware/roleMiddleware.js");
const { upload } = require("../config/multer/multer.js");

const Router = express.Router();

Router.get("/me", verifyUser, CatchAsync(getProfileController));
Router.get("/", roleMiddleware([1, 2, 3]), CatchAsync(getProfilesController));
Router.patch(
    "/me",
    upload.single("profileImage"),
    verifyUser,
    CatchAsync(profileUpdateController)
);
Router.delete("/me", verifyUser, CatchAsync(profileDeleteController));

Router.get("/image/:filename", (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(
        __dirname,
        "../../public/profile_images/",
        filename
    );

    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send({ message: "Image not found" });
        }
    });
});

// Admin user management routes

Router.delete(
    "/delete/:id",
    roleMiddleware([1, 2, 3]),
    verifyUser,
    CatchAsync(deleteUserController)
);
Router.patch(
    "/update/:id",
    roleMiddleware([1, 2, 3]),
    verifyUser,
    CatchAsync(updateUserController)
);

module.exports = Router;
