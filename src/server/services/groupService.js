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

export const addMemberToGroup = async (ownerId, user, groupId) => {
  if (!isObjectID(ownerId)) {
    return { message: "invalid ownerId", status: false };
  }
  if (!isObjectID(groupId)) {
    return { message: "invalid groupId", status: false };
  }

  let result = await groupModel.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(groupId),
      ownerId: mongoose.Types.ObjectId(ownerId),
    },
    {
      $push: {
        users: {
          userId: mongoose.Types.ObjectId(user._id),
          name: user.name,
        },
      },
    }
  );
  if (result) {
    return { status: true, result };
  }
  return {
    message: "Not allowed to add member to this group",
    status: false,
  };
};
