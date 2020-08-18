import express from "express";
import { OK_RESPONSE } from "../../constants/http";

const router = express.Router();

router.get("/", (req, res) => {
  return res
    .status(OK_RESPONSE)
    .cookie("token", "", { httpOnly: true, path: "/" })
    .json({ message: "done" });
});

module.exports = router;
