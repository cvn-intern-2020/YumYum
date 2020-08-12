import {
  isAllowedToEditGroup,
  isUserInGroup,
  areDishesInGroup,
} from "../services/groupService";
import { isObjectID } from "../utils/validator";
import { getOrderByGroupId, createOrder } from "../services/orderService";
import isTotalPriceCorrect from "../utils/checkTotalPrice";
import convertToObjectId from "../utils/convertToObjecId";
import { doDishesExist } from "../services/dishService";

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
  if (!isUserInGroup(userId, groupId)) {
    return res.status(400).json({
      message: "groupId does not exist or not allowed to order in this group",
    });
  }
  if (!isTotalPriceCorrect({ details, totalPrice })) {
    return res.status(400).json({
      message: "price and quantity of dish does not match total price",
    });
  }
  details = convertToObjectId(details);
  if (!doDishesExist) {
    return res.status(400).json({
      message: "dishId sent does not exist or deleted",
    });
  }
  if (!areDishesInGroup(details)) {
    return res.status(400).json({
      message: "dishId sent is not in group",
    });
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
