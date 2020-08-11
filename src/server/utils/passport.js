const { getUserById } = require("../services/userService");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "1234567890";
opts.passReqToCallback = true;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (req, jwt_payload, done) => {
      let user = await getUserById(jwt_payload._id);
      if (user) {
        req._id = jwt_payload._id;
        return done(null, user);
      }
      return done(null, false);
    })
  );
};
