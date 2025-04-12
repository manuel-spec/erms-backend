const jwt = require("jsonwebtoken");
const { getProfileService } = require("./profile.service");

const getMyProfile = async (req, res) => {
    try {
        const userId = req.decoded.id;
        const userProfile = await getProfileService(userId);

        if (!userProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(userProfile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getMyProfile };
