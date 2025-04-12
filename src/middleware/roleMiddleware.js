const jwt = require("jsonwebtoken");

const roleMiddleware = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token)
                return res.status(403).json({ message: "No token provided" });
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded);
            req.user = {
                id: decoded.id,
                email: decoded.email,
                roleId: decoded.role,
            };
            // console.log(req.user);

            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: "Access denied" });
            }

            next();
        } catch (error) {
            console.error("JWT decoding error:", error.message);
            return res.status(401).json({ message: "Unauthorized" });
        }
    };
};

module.exports = { roleMiddleware };
