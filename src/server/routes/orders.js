import express from "express";
import { getOrderByGroupIdController, createNewOrderController } from "../controllers/Order";

const router = express.Router();

router.get("/group/:groupId", getOrderByGroupIdController);
router.post("/new", createNewOrderController);

module.exports = router;
