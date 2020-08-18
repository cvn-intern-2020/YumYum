import mongoose from "mongoose";
import OrdersModel from "../models/orders";
import { isObjectID } from "../utils/validator";

export const getOrderByGroupId = async (groupId) => {
  const groupOrders = await OrdersModel.find({
    groupId: mongoose.Types.ObjectId(groupId),
  })
    .select("-groupId -__v").populate({
      path: "userId",
      select: "name"
    })
    .lean();
  return { result: groupOrders, status: true };
};
export const createOrder = async (groupId, userId, details, totalPrice) => {
  if (!isObjectID(groupId)) {
    return { message: "invalid group, check your Id", status: false };
  }
  if (!isObjectID(userId)) {
    return { message: "invalid user, check your Id", status: false };
  }
  const createdOrder = await OrdersModel.create({
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
