import jwt from "jsonwebtoken";
import { getUserById, addGroupToUser } from "../services/userService";
import { inviteMemberToGroup } from "../services/groupService";

export const getInviteController = async (req, res) => {
  let inviteToken = req.params.inviteToken;
  let userId = req._id;
  jwt.verify(inviteToken, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "token is invalid or expired" });
    }
    let groupId = decoded.groupId;
    let user = await getUserById(userId);
    if (!user.status) {
      return res.status(400).json({ message: "Email does not exist" });
    }
    user = user.result;
    if (user.groups.find(group => group.groupId == groupId)){
        return res.status(400).json({ message: "Already in group" });
    }
    let inviteToGroupResult = await inviteMemberToGroup(user, groupId);
    if (!inviteToGroupResult.status) {
      return res.status(400).json({ message: inviteToGroupResult.message });
    }

    let addGroupToUserResult = await addGroupToUser(
      userId,
      inviteToGroupResult.result._id,
      inviteToGroupResult.result.name,
      false
    );
    if (!addGroupToUserResult.status) {
      return res.status(400).json({ message: addGroupToUserResult.message });
    }
    return res.status(200).json({ groupId });
  });
};
