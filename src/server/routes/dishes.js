import express from "express";
import { createDishController } from "../controllers/Dishes";

const router = express.Router();

router.post("/new", createDishController);

module.exports = router;
