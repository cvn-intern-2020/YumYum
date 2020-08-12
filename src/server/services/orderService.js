import mongoose from "mongoose";
import OrdersModel from "../models/orders";
import { isObjectID } from "../utils/validator";
import convertToObjectId from "../utils/convertToObjecId";

export const getOrderByGroupId = async (groupId) => {
  let groupOrders = await OrdersModel.find({
    groupId: mongoose.Types.ObjectId(groupId),
  })
    .select("-groupId -__v")
    .lean();
  return { result: groupOrders, status: true };
};
export const createOrder = async (groupId, userId, details, totalPrice) => {
  if (!isObjectID(groupId)) {
    return { message: "invalid groupId", status: false };
  }
  if (!isObjectID(userId)) {
    return { message: "invalid userId", status: false };
  }
  details = convertToObjectId(details);
  let createdOrder = await OrdersModel.create({
    groupId,
    userId,
    details,
    totalPrice,
  });

  if (!createdOrder) {
    return { message: "something went wrong", status: false };
  }
  return { message: "Order successfully", status: true };
};
