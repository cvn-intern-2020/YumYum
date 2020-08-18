const { getUserById } = require("../services/userService");

const JwtStrategy = require("passport-jwt").Strategy;
const opts = {};
opts.secretOrKey = process.env.SECRET_KEY;
opts.passReqToCallback = true;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(
      { ...opts, jwtFromRequest: (req) => req.cookies.token },
      async (req, jwt_payload, done) => {
        let user = await getUserById(jwt_payload._id);
        if (user) {
          req._id = jwt_payload._id;
          return done(null, user);
        }
        return done(null, false);
      }
    )
  );
};
