import {
  getGroupById,
  addMemberToGroup,
  createGroup,
} from "../services/groupService";
import { getUserByEmail, addGroupToUser } from "../services/userService";

export const getGroupController = async (req, res) => {
  let groupId = req.params.groupId;
  let userId = req._id;
  let result = await getGroupById(groupId);
  if (!result.status) {
    return res.status(400).json(result.message);
  }
  result = result.result;
  if (result.ownerId == userId) {
    return res.status(200).json(result);
  }
  for (const user of result.users) {
    if (userId == user.userId) {
      return res.status(200).json(result);
    }
  }
  return res
    .status(400)
    .json({ message: "You are not a member of this group" });
};

export const addMemberController = async (req, res) => {
  let userEmail = req.body.userEmail;
  let ownerId = req._id;
  let groupId = req.params.groupId;
  let user = await getUserByEmail(userEmail);
  if (!user.status) {
    return res.status(400).json({ message: "Email does not exist" });
  }
  user = user.result;
  for (let group of user.groups) {
    if (group.groupId == groupId) {
      return res.status(400).json({ message: "User has already in group" });
    }
  }
  let result1 = await addMemberToGroup(ownerId, user, groupId);
  if (!result1.status) {
    return res.status(400).json({ message: result1.message });
  }
  let result2 = await addGroupToUser(
    user._id,
    groupId,
    result1.result.name,
    false
  );
  if (!result2.status) {
    return res.status(400).json({ message: result2.message });
  }
  return res.status(200).json({ message: "Successfully Added" });
};

export const createNewGroupController = async (req, res) => {
  let { name, description } = req.body;
  let ownerId = req._id;
  let result = await createGroup(name, ownerId, description);
  if (result.status) {
    return res.status(200).json(result);
  }
  return res.status(400).json({ message: "something went wrong" });
};
