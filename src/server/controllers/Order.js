import { isAllowedToEditGroup } from "../services/groupService";
import { isObjectID } from "../utils/validator";
import { getOrderByGroupId } from "../services/orderService";

export const getOrderByGroupIdController = async (req, res) => {
  let groupId = req.params.groupId;
  if (!isObjectID(groupId)) {
    return res.status(400).json({ message: "Invalid GroupId" });
  }
  let ownerId = req._id;
  let isAllowed = await isAllowedToEditGroup(groupId, ownerId);
  if (!isAllowed) {
    return res.status(400).json({
      message: "Not allowed to read group orders or groupId does not exist",
    });
  }

  let getOrderResult = await getOrderByGroupId(groupId);
  return res.status(200).json(getOrderResult.result);
};
