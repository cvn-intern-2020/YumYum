import express from "express";
import { getInviteController } from "../controllers/Invite";

const router = express.Router();

router.get("/:inviteToken", getInviteController);

module.exports = router;
