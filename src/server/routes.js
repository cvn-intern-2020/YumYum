const express = require("express");
const router = express.Router();

router.use(
  "/groups",
  (req, res, next) => {
    next();
  },
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
