import { isObjectID } from "../utils/validator";
import mongoose from "mongoose";
import groupModel from "../models/groups";
import { addGroupToUser } from "./userService";

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

export const createGroup = async (name, ownerId, description) => {
  if (!isObjectID(ownerId)) {
    return { message: "invalid ownerId", status: false };
  }
  let result1 = await groupModel.create({
    name: name,
    ownerId: mongoose.Types.ObjectId(ownerId),
    description: description,
  });
  let result2 = await addGroupToUser(ownerId, result1._id, name, true);
  if (result2.status) {
    return { result1, status: true };
  }
  return { message: result2.message, status: false };
};
