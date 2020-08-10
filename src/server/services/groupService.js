import { isObjectID } from "../utils/validator";
import mongoose from "mongoose";
import groupModel from "../models/groups";

export const getGroupById = async (groupId) => {
  if (!isObjectID(groupId)) {
    return { message: "invalid groupId", status: false };
  }
  let result = await groupModel.findOne({
    _id: mongoose.Types.ObjectId(groupId),
  });
  if (result) {
    return { result, status: true };
  }
  return { message: "groupId does not exist", status: false };
};
