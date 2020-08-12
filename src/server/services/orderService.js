import mongoose from "mongoose";
import OrdersModel from "../models/orders";

export const getOrderByGroupId = async (groupId) => {
  let groupOrders = await OrdersModel.find({
    groupId: mongoose.Types.ObjectId(groupId),
  }).select("-groupId -__v").lean();
  return { result: groupOrders, status: true };
};
