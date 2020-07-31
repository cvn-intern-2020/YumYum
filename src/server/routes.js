const express = require("express");
const router = express.Router();
import passport from "passport";

router.use(
  "/groups",
  passport.authenticate("jwt", { session: false }),
  require("./routes/groups")
);
router.use(
  "/auth/signin",
  (req, res, next) => {
    next();
  },
  require("./routes/auth/signin")
);

router.use(
  "/auth/signup",
  (req, res, next) => {
    next();
  },
  require("./routes/auth/signup")
);
module.exports = router;
