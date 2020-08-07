import mongoose from "mongoose";

export const isObjectID = (objectid) => {
  return mongoose.Types.ObjectId.isValid(objectid);
};
