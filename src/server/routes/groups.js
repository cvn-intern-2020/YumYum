import express from "express";
import groupModel from "../models/groups";

const router = express.Router();

router.get("/:groupId", async (req, res) => {
  let groupId = req.params.groupId;
  let userId = req._id;
  let result = await groupModel.getGroupById(groupId);
  if (!result.status) {
    return res.status(400).json(result.message);
  }
  result = result.result;
  for(const user of result.users ){
    if(userId == user.userId){
      return res.status(200).json(result);
    }
  }
  return res.status(400).json({message: "You are not a member of this group"});
});
router.post("/:groupId/add/member", async (req, res) => {
  let userEmail = req.body.userEmail;
  let ownerId = req._id;
  let groupId = req.params.groupId;
  let result = await groupModel.addMember(ownerId, userEmail, groupId);
  if (!result.status) {
    return res.status(400).json({ message: result.message });
  }
  return res.status(200).json({ message: result.message });
});

router.get("/", async (req, res) => {
  let result = await groupModel.getGroups();
  return res.status(200).json(result);
});

router.post("/new", async (req, res) => {
  let { name, description } = req.body;
  let ownerId = req._id;
  let result = await groupModel.createGroup(name, ownerId, description);
  if (!result.status) {
    return res.status(400).json({ message: "something went wrong" });
  }
  return res.status(200).json(result.message);
});

router.delete("/", async (req, res) => {
  let groupId = req.body.groupId;
  let result = await groupModel.deleteGroupById(groupId);
  return res.status(200).json(result);
});

module.exports = router;
