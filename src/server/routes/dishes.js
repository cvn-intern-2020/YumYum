import express from "express";
import {
  getDishByUserIdController,
  createDishController,
  deleteDishController,
} from "../controllers/Dishes";

const router = express.Router();

router.get("/user/", getDishByUserIdController);

router.post("/new", createDishController);

router.delete("/:dishId", deleteDishController);

module.exports = router;
