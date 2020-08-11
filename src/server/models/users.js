import mongoose from "mongoose";

const Users = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserGroup = mongoose.Schema(
  {
    groupId: { type: ObjectId, ref: "Groups", required: true },
    name: { type: String, required: true },
    isOwner: { type: Boolean, required: true },
  },
  { _id: false }
);

export const UsersSchema = new Users({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  groups: [UserGroup],
});

const userModel = mongoose.model("Users", UsersSchema);
export default userModel;
