import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { httpOnly: true, path: "/" })
    .json({ message: "done" });
});

module.exports = router;
