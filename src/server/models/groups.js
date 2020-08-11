import mongoose from "mongoose";

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

const groupModel = mongoose.model("Groups", GroupSchema);
export default groupModel;
