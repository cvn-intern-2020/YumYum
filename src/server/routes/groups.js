import express from "express";

import {
  getGroupController,
  addMemberController,
  createNewGroupController,
} from "../controllers/Group";

const router = express.Router();

router.get("/:groupId", getGroupController);

router.post("/:groupId/add/member", addMemberController);

router.post("/new", createNewGroupController);

module.exports = router;
