import userModel from "../models/users";
import mongoose from "mongoose";

export const getUserByEmail = async (email) => {
  let result = await userModel
    .findOne({ email: email })
    .select("email password groups name")
    .lean();
  if (!result) {
    return { message: "Email does not exist", status: false };
  }
  return { result, status: true };
};

export const createUser = async (email, phone, password, name) => {
  let result = await userModel.create({
    name: name,
    phone: phone,
    email: email,
    password: password,
  });
  return { result, status: true };
};

export const getUserById = async (userId) => {
  let result = await userModel
    .findOne({ _id: mongoose.Types.ObjectId(userId) })
    .select("-password -__v")
    .lean();
  if (!result) {
    return { status: false, message: "User does not exist" };
  }
  return { result, status: true };
};

export const addGroupToUser = async (userId, groupId, name, isOwner) => {
  let result = await userModel.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(userId),
    },
    {
      $push: {
        groups: {
          groupId,
          name,
          isOwner,
        },
      },
    }
  );
  if (!result) {
    return { status: false, message: "UserId does not exist" };
  }
  return { result, status: true };
};
