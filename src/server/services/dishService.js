import mongoose from "mongoose";
import dishesModel from "../models/dishes";
import { isObjectID } from "../utils/validator";

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

export const createDish = async (name, price, userId) => {
  if (!isObjectID(userId)) {
    return { message: "invalid ownerId", status: false };
  }
  let createdDish = await dishesModel.create({
    name,
    price,
    userId: mongoose.Types.ObjectId(userId),
  });
  if (!createdDish) {
    return { message: "something went wrong", status: false };
  }
  return { result: createdDish, status: true };
};
