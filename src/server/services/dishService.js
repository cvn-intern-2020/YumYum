import mongoose from "mongoose";
import dishesModel from "../models/dishes";
import { isObjectID } from "../utils/validator";
import e from "express";

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

export const getManyDishes = async (dishArray) => {
  let result = await dishesModel
    .find({ $and: [{ _id: { $in: [...dishArray] } }, { deleteAt: null }] })
    .select("-deleteAt -userId")
    .lean(0);
  if (!result) {
    return { message: "No dish found", status: false };
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

export const deleteDish = async (userId, dishId) => {
  let deletedDish = await dishesModel.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(dishId),
      userId: mongoose.Types.ObjectId(userId),
    },
    { deleteAt: new Date() }
  );
  if (!deletedDish) {
    return {
      message: "dishId does not exist or not allowed to delete dish",
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
