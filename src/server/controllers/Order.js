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

export const getOrderByGroupIdController = async (req, res) => {
  let groupId = req.params.groupId;
  if (!isObjectID(groupId)) {
    return res.status(400).json({ message: "Invalid GroupId" });
  }
  let userId = req._id;
  let result = await isAllowedToReadOrders(groupId, userId);
  if (!result) {
    return res.status(400).json({
      message: "Not alow to read order in group",
    });
  }
  let getOrderResult = await getOrderByGroupId(groupId);
  if (userId == result.ownerId) {
    return res.status(200).json(getOrderResult.result);
  }
  getOrderResult = getOrderResult.result.filter(
    (order) => order.userId._id == userId
  );
  return res.status(200).json(getOrderResult);
};
export const createNewOrderController = async (req, res) => {
  let userId = req._id;
  let { details, totalPrice, groupId } = req.body;
  console.log(req.body);
  if (!(await isUserInGroup(userId, groupId))) {
    return res.status(400).json({
      message: "groupId does not exist or not allowed to order in this group",
    });
  }
  if (
    totalPrice <= 0 ||
    details.filter((detail) => detail.quantity > 0 && detail.dishPrice > 0)
      .length < details.length
  ) {
    return res.status(400).json({
      message: "total price, quantity or price is invalid",
    });
  }

  if (!isTotalPriceCorrect({ details, totalPrice })) {
    return res.status(400).json({
      message: "price and quantity of dish does not match total price",
    });
  }
  details = convertToObjectId(details);
  let dishExistResult = await doDishesExist(details);
  if (!dishExistResult) {
    return res.status(400).json({
      message: "dishId sent does not exist or deleted",
    });
  }
  let dishesInGroupResult = await areDishesInGroup(groupId, details);
  if (!dishesInGroupResult) {
    return res.status(400).json({
      message: "dishId sent is not in group",
    });
  }

  let createOrderResult = await createOrder(
    groupId,
    userId,
    details,
    totalPrice
  );
  if (!createOrderResult.status) {
    return res.status(400).json({ message: "something went wrong" });
  }
  return res.status(200).json({ message: createOrderResult.message });
};
