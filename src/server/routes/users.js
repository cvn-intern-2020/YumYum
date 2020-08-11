import express from "express";
import { getUserController } from "../controllers/User";

const router = express.Router();

router.get("/", getUserController);

module.exports = router;
