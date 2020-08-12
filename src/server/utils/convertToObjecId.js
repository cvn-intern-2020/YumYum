import mongoose from "mongoose";

const convertToObjectId = (source) => {
  for (let detail of source) {
    detail.dishId = mongoose.Types.ObjectId(detail.dishId);
  }
  return source;
};

export default convertToObjectId;
