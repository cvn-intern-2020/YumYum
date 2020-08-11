import {
  getGroupById,
  addMemberToGroup,
  createGroup,
  isAllowedToEditGroup,
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

  let isallowed = await isAllowedToEditGroup(groupId, ownerId);
  if (!isallowed) {
    return res.status(400).json({ message: "Not allowed to add member" });
  }

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

  let addMemberResult = await addMemberToGroup(ownerId, user, groupId);
  if (!addMemberResult.status) {
    return res.status(400).json({ message: addMemberResult.message });
  }
  
  let addGroupResult = await addGroupToUser(
    user._id,
    groupId,
    addMemberResult.result.name,
    false
  );
  if (!addGroupResult.status) {
    return res.status(400).json({ message: addGroupResult.message });
  }
  return res.status(200).json({ message: "Successfully Added" });
};

export const createNewGroupController = async (req, res) => {
  let { name, description } = req.body;
  let ownerId = req._id;
  let { result, status } = await createGroup(name, ownerId, description);
  if (!status) {
    return res.status(400).json({ message: "something went wrong" });
  }
  return res.status(200).json(result);
};
