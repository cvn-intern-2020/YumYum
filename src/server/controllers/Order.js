import { isAllowedToEditGroup, isUserInGroup } from "../services/groupService";
import { isObjectID } from "../utils/validator";
import { getOrderByGroupId, createOrder } from "../services/orderService";

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
export const createNewOrderController = async (req, res) => {
  let userId = req._id;
  let { details, totalPrice, groupId } = req.body;
  if (!isUserInGroup(userId, groupId)){
    return res.status(400).json({message: "groupId does not exist or not allowed to order in this group"});
  }
  let { result, status } = await createOrder(
    groupId,
    userId,
    details,
    totalPrice
  );
  if (!status) {
    return res.status(400).json({ message: "something went wrong" });
  }
  return res.status(200).json(result);
};
