import mongoose from "mongoose";
import userModel from "./users";

const Groups = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const GroupSchema = new Groups({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ownerId: { type: ObjectId, required: true, ref: "Users" },
  users:
    [
      {
        userId: { type: ObjectId, required: true, ref: "Users" },
        name: { type: String, required: true },
      }
    ],
  dishes:
    [
      {
        type: ObjectId, required: true, ref: "Dishes"
      }
    ]
});

GroupSchema.statics.getGroups = async function () {
  let result = await this.find({});
  return result;
};

GroupSchema.statics.getGroupById = async function (groupId) {
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(groupId) });
  return result;
};

GroupSchema.statics.createGroup = async function (name, ownerId, description) {
  let result = await this.create({
    name: name,
    ownerId: mongoose.Types.ObjectId(ownerId) ,
    description: description,
  });
  userModel.addUserGroup(ownerId, result._id, name, true);
  return result;
};

GroupSchema.statics.deleteGroupById = async function (groupId) {
  let result = await this.deleteOne({
    _id: mongoose.Types.ObjectId(groupId)
  });
  return result;
};

const groupModel = mongoose.model("Groups", GroupSchema);
export default groupModel;
