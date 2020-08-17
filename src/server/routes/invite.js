import express from "express";
import { inviteController } from "../controllers/Invite";

const router = express.Router();

router.get("/:inviteToken", inviteController);

module.exports = router;
