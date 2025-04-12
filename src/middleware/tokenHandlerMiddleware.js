const jwt = require("jsonwebtoken");
const { User } = require("../auth/model/user.model");

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: "No token provided, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded);

        req.user = {
            id: decoded.id,
            email: decoded.email,
            roleId: decoded.role,
        };

        req.decoded = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: "Token is invalid or expired" });
    }
};

module.exports = { verifyUser };
