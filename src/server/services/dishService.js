import mongoose from "mongoose";
import dishesModel from "../models/dishes";
import { isObjectID } from "../utils/validator";

export const getDishByUserId = async (userId) => {
  const result = await dishesModel
    .find({ userId: mongoose.Types.ObjectId(userId), deleteAt: null })
    .select("-deleteAt -userId")
    .lean();
  if (!result) {
    return { message: "user does not exist", status: false };
  }
  return { result, status: true };
};

export const getManyDishes = async (dishArray) => {
  const result = await dishesModel
    .find({ $and: [{ _id: { $in: [...dishArray] } }, { deleteAt: null }] })
    .sort("")
    .select("-deleteAt -userId")
    .lean(0);
  if (!result) {
    return { message: "No dishes found", status: false };
  }
  return { result, status: true };
};

export const createDish = async (name, price, userId) => {
  if (!isObjectID(userId)) {
    return { message: "invalid user, check your Id", status: false };
  }
  const createdDish = await dishesModel.create({
    name,
    price,
    userId: mongoose.Types.ObjectId(userId),
  });
  if (!createdDish) {
    return { message: "something went wrong", status: false };
  }
  return { result: createdDish, status: true };
};

export const deleteDish = async (userId, dishId) => {
  const deletedDish = await dishesModel.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(dishId),
      userId: mongoose.Types.ObjectId(userId),
    },
    { deleteAt: new Date() }
  );
  if (!deletedDish) {
    return {
      message: "dish does not exist or you are not allowed to delete dish",
      status: false,
    };
  }
  return { status: true };
};

export const doDishesExist = async (dishDetails) => {
  let dishArray = dishDetails.map((detail) => detail.dishId);
  let dishResults = await dishesModel.find({
    _id: { $in: [...dishArray] },
    deleteAt: null,
  });
  if (dishResults.length != dishArray.length) {
    return false;
  }
  return true;
};
