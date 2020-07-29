import mongoose from "mongoose";

const Groups = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const GroupSchema = new Groups({
  name: { type: String, required: true },
  owner: { type: ObjectId, required: true, ref: "Users" },
  description: { type: String, required: true },
});

GroupSchema.statics.getGroups = async function () {
  let result = await this.find({});
  return result;
};

const groupModel = mongoose.model("Groups", GroupSchema);
export default groupModel;
