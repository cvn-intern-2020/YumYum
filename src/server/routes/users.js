import express from "express";
import userModel from "../models/users";

const router = express.Router();

router.get("/", async (req, res) => {
  let userId = req._id;
  let result = await userModel.getUserById(userId);
  return res.status(200).json(result);
});

module.exports = router;
