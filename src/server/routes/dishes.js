import express from "express";
import {getDishByUserIdController} from "../controllers/Dishes";


const router = express.Router();

router.get("/user/:userId", getDishByUserIdController);

module.exports = router;
