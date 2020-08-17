import express from "express";
import {
  getInviteController,
  createInviteController,
} from "../controllers/Invite";

const router = express.Router();

router.get("/:inviteHash", getInviteController);
router.get("/group/:groupId", createInviteController);

module.exports = router;
