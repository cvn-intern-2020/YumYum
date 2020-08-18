import {
  isUserInGroup,
  areDishesInGroup,
  isAllowedToReadOrders,
} from "../services/groupService";
import { isObjectID } from "../utils/validator";
import { getOrderByGroupId, createOrder } from "../services/orderService";
import isTotalPriceCorrect from "../utils/checkTotalPrice";
import convertToObjectId from "../utils/convertToObjecId";
import { doDishesExist } from "../services/dishService";
import { OK_RESPONSE, HANDLED_ERROR_RESPONSE } from "../constants/http";

export const getOrderByGroupIdController = async (req, res) => {
  const groupId = req.params.groupId;
  if (!isObjectID(groupId)) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Invalid GroupId" });
  }
  const userId = req._id;
  const result = await isAllowedToReadOrders(groupId, userId);
  if (!result) {
    return res.status(HANDLED_ERROR_RESPONSE).json({
      message: "Not alow to read order in group",
    });
  }
  let getOrderResult = await getOrderByGroupId(groupId);
  if (userId == result.ownerId) {
    return res.status(OK_RESPONSE).json(getOrderResult.result);
  }
  getOrderResult = getOrderResult.result.filter(
    (order) => order.userId._id == userId
  );
  return res.status(OK_RESPONSE).json(getOrderResult);
};
export const createNewOrderController = async (req, res) => {
  const userId = req._id;
  const { totalPrice, groupId } = req.body;
  let { details } = req.body;
  if (!(await isUserInGroup(userId, groupId))) {
    return res.status(HANDLED_ERROR_RESPONSE).json({
      message: "groupId does not exist or not allowed to order in this group",
    });
  }
  if (
    totalPrice <= 0 ||
    details.filter((detail) => detail.quantity > 0 && detail.dishPrice > 0)
      .length < details.length
  ) {
    return res.status(HANDLED_ERROR_RESPONSE).json({
      message: "total price, quantity or price is invalid",
    });
  }

  if (!isTotalPriceCorrect({ details, totalPrice })) {
    return res.status(HANDLED_ERROR_RESPONSE).json({
      message: "price and quantity of dish does not match total price",
    });
  }
  details = convertToObjectId(details);
  const dishExistResult = await doDishesExist(details);
  if (!dishExistResult) {
    return res.status(HANDLED_ERROR_RESPONSE).json({
      message: "dishId sent does not exist or deleted",
    });
  }
  const dishesInGroupResult = await areDishesInGroup(groupId, details);
  if (!dishesInGroupResult) {
    return res.status(HANDLED_ERROR_RESPONSE).json({
      message: "dishId sent is not in group",
    });
  }

  const createOrderResult = await createOrder(
    groupId,
    userId,
    details,
    totalPrice
  );
  if (!createOrderResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "something went wrong" });
  }
  return res.status(OK_RESPONSE).json({ message: createOrderResult.message });
};
