import express from "express";
import { signUpController } from "../../controllers/Auth";

const router = express.Router();

router.post("/", signUpController);

module.exports = router;
