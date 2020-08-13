import mongoose from "mongoose";

const convertToObjectId = (source) => {
  for (let detail of source) {
    detail.dishId = mongoose.Types.ObjectId(detail._id);
    delete detail._id
  }
  console.log(source);
  return source;
};

export default convertToObjectId;
