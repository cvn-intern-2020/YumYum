const express = require("express");
const router = express.Router();
import passport from "passport";

const authenticator = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user) {
      return res
        .status(401)
        .json({ message: "You are not logged in or cookie has expired" });
    }
    next();
  })(req, res, next);

router.use("/groups", authenticator, require("./routes/groups"));
router.use("/auth/signin", require("./routes/auth/signin"));

router.use("/auth/signup", require("./routes/auth/signup"));

router.use("/users", authenticator, require("./routes/users"));

router.use("/dishes", authenticator, require("./routes/dishes"));

router.use("/orders", authenticator, require("./routes/orders"));

router.use("/invite", authenticator, require("./routes/invite"));

router.use("/auth/signout", authenticator, require("./routes/auth/signout"));
module.exports = router;
