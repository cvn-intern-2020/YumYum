import { isObjectID } from "../utils/validator";
import mongoose from "mongoose";
import groupModel from "../models/groups";
import { addGroupToUser } from "./userService";
// eslint-disable-next-line no-unused-vars
import dishesModel from "../models/dishes";

export const isAllowedToEditGroup = async (groupId, userId) => {
  if (!isObjectID(groupId)) {
    return { message: "invalid groupId", status: false };
  }
  let result = await groupModel
    .findOne({
      _id: mongoose.Types.ObjectId(groupId),
      ownerId: mongoose.Types.ObjectId(userId),
    })
    .lean();
  if (!result) {
    return false;
  }
  return true;
};

export const doesGroupExist = async (groupId) => {
  return await groupModel.exists({ _id: mongoose.Types.ObjectId(groupId) });
};

export const getGroupById = async (groupId) => {
  if (!isObjectID(groupId)) {
    return { message: "invalid groupId", status: false };
  }
  let result = await groupModel
    .findOne({
      _id: mongoose.Types.ObjectId(groupId),
    })
    .populate("dishes");
  if (!result) {
    return { message: "groupId does not exist", status: false };
  }
  return { result, status: true };
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
  if (!result) {
    return { status: false, message: "Something went wrong" };
  }
  return { status: true, result };
};

export const createGroup = async (name, ownerId, description) => {
  if (!isObjectID(ownerId)) {
    return { message: "invalid ownerId", status: false };
  }
  let createdGroup = await groupModel.create({
    name,
    ownerId,
    description,
  });
  let addGroupResult = await addGroupToUser(
    ownerId,
    createdGroup._id,
    name,
    true
  );
  if (!addGroupResult.status) {
    return { message: addGroupResult.message, status: false };
  }
  return { result: createdGroup, status: true };
};
