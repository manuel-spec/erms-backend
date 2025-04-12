const { ExtractJwt, Strategy } = require("passport-jwt");
const passport = require("passport");
const { User } = require("../../auth/model/user.model.js");
const dotenv = require("dotenv");

dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new Strategy(opts, async (payload, done) => {
        try {
            const user = await User.findOne({ where: { id: payload.id } });
            if (user) return done(null, user);
            return done(null, false); // Return false if user not found
        } catch (error) {
            return done(error);
        }
    })
);

module.exports = passport;
