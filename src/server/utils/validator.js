import mongoose from "mongoose";
import { isNumber, isNaN, isUndefined } from "lodash";

export const isObjectID = (objectid) => {
  return mongoose.Types.ObjectId.isValid(objectid);
};

export const validateDish = (name, price) => {
  if (isUndefined(name) || isUndefined(price)) {
    return {
      status: false,
      message: "Please enter all fields required: name and price",
    };
  }
  if (name == "") {
    return { status: false, message: "Name is empty" };
  }
  if (isNaN(price) || !isNumber(price) || price < 0) {
    return { status: false, message: "Price is invalid" };
  }
  return { status: true };
};
