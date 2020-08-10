import { getGroupById } from "../services/groupService";

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
