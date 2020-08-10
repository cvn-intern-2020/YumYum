import express from "express";
import { getUserController } from "../controllers/User";

const router = express.Router();

router.get(
  "/",
  getUserController
  //  async (req, res) => {
  //   let userId = req._id;
  //   let result = await userModel.getUserById(userId);
  //   return res.status(200).json(result);
  // }
);

module.exports = router;
