const express = require("express");
const router = express.Router();



router.use(
  "/groups",
  (req, res, next) => {
    next();
  },
  require("./routes/groups")
);

module.exports = router;
