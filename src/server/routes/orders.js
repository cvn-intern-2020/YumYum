import express from "express";
import { getOrderByGroupIdController } from "../controllers/Order";

const router = express.Router();

router.get("/group/:groupId", getOrderByGroupIdController);

module.exports = router;
