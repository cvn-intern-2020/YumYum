import mongoose from "mongoose";
import userModel from "./users";
import { isObjectID } from "../utils/validator";

const Groups = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Members = mongoose.Schema(
  {
    userId: { type: ObjectId, required: true, ref: "Users" },
    name: { type: String, required: true },
  },
  { _id: false }
);

export const GroupSchema = new Groups({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ownerId: { type: ObjectId, required: true, ref: "Users" },
  users: [Members],
  dishes: [
    {
      type: ObjectId,
      required: true,
      ref: "Dishes",
    },
  ],
});

GroupSchema.statics.getGroups = async function () {
  let result = await this.find({});
  return result;
};

GroupSchema.statics.getGroupById = async function (groupId) {
  if (!isObjectID(groupId)) {
    return { message: "invalid groupId", status: false };
  }
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(groupId) });
  if (!result) {
    return { message: "groupId does not exist", status: false };
  }
  return { result, status: true };
};

GroupSchema.statics.addMember = async function (ownerId, userEmail, groupId) {
  if (!isObjectID(ownerId)) {
    return { message: "invalid ownerId", status: false };
  }
  if (!isObjectID(groupId)) {
    return { message: "invalid groupId", status: false };
  }
  let user = await userModel.getUserByEmail(userEmail);

  if (!user.status) {
    return { message: user.message, status: false };
  }
  user = user.result;

  for (let group of user.groups) {
    if (group.groupId == groupId) {
      return { message: "User has already in group", status: false };
    }
  }

  let result = await this.findOneAndUpdate(
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
    return {
      message: "Not allowed to add member to this group",
      status: false,
    };
  }
  userModel.addUserGroup(user._id, groupId, result.name, false);
  return { message: "Successfully added", status: true };
};

GroupSchema.statics.createGroup = async function (name, ownerId, description) {
  if (!isObjectID(ownerId)) {
    return { message: "invalid ownerId", status: false };
  }
  let result = await this.create({
    name: name,
    ownerId: mongoose.Types.ObjectId(ownerId),
    description: description,
  });
  userModel.addUserGroup(ownerId, result._id, name, true);
  return { message: "Successfully created", status: true };
};

GroupSchema.statics.deleteGroupById = async function (groupId) {
  if (!isObjectID(groupId)) {
    return { message: "invalid groupId", status: false };
  }
  let result = await this.deleteOne({
    _id: mongoose.Types.ObjectId(groupId),
  });
  if (!result) {
    return { message: "groupId does not exist", status: false };
  }
  return { message: "Successfully created", status: true };
};

const groupModel = mongoose.model("Groups", GroupSchema);
export default groupModel;
