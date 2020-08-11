import express from "express";
import { signInController } from "../../controllers/Auth";

const router = express.Router();

router.post("/", signInController);

module.exports = router;
