import mongoose from "mongoose";

const Groups = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const GroupSchema = new Groups({});

GroupSchema.statics.getGroups = async function () {};
