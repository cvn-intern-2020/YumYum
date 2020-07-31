import mongoose from "mongoose";

const Users = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const UsersSchema = new Users({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    groupId: [{ type: ObjectId, required: true, ref: "Groups" }],
});

UsersSchema.statics.getUserById = async function (userId) {
    let result = await this.findOne({ _id: mongoose.Types.ObjectId(userId) });
    console.log(result);
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  groups: [{ type: ObjectId, required: true, ref: "Groups" }],
});

UsersSchema.statics.createUser = async function (name, phone, email, password, groups) {
  let result = await this.create({
    name: name,
    phone: phone,
    email: email,
    password: password,
    groups: groups,
  });
  return result;
};

const userModel = mongoose.model("Users", UsersSchema);
export default userModel;
