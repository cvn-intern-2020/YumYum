import dishesModel from "../models/dishes";
import mongoose from "mongoose";

export const getDishByUserId = async (userId) => {
  let result = await dishesModel
    .find({ userId: mongoose.Types.ObjectId(userId), deleteAt: null })
    .select("-deleteAt -userId")
    .lean();
  if (!result) {
    return { message: "UserId does not exist", status: false };
  }
  return { result, status: true };
};
