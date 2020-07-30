import express from "express";
import groupModel from "../models/groups";

const router = express.Router();

router.get("/:groupId", async (req, res) => {
  let groupId = req.params.groupId;
  let result = await groupModel.getGroupById(groupId);
  return res.status(200).json(result);
});

router.get("/", async (req, res) => {
    let result = await groupModel.getGroups();
    return res.status(200).json(result);
  });

router.post("/", async (req, res) => {
  let { name, owner, description } = req.body;
  return res
    .status(200)
    .json(await groupModel.createGroup(name, owner, description));
});

router.delete("/", async (req, res) => {
    let groupId = req.body.groupId;
    let result = await groupModel.deleteGroupById(groupId);
    return res.status(200).json(result);
});


module.exports = router;
