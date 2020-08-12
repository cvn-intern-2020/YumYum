import express from "express";
import {getDishByUserIdController, createDishController} from "../controllers/Dishes";

const router = express.Router();

router.get("/user/:userId", getDishByUserIdController);

router.post("/new", createDishController);

module.exports = router;
