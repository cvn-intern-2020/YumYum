import express from "express";
import groupModel from "../models/groups";
import {
  getGroupController,
  addMemberController,
  createNewGroupController,
} from "../controllers/Group";

const router = express.Router();

router.get("/:groupId", getGroupController);

router.post("/:groupId/add/member", addMemberController);

router.post("/new", createNewGroupController);

router.delete("/", async (req, res) => {
  let groupId = req.body.groupId;
  let result = await groupModel.deleteGroupById(groupId);
  return res.status(200).json(result);
});

module.exports = router;
