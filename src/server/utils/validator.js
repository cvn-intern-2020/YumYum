import mongoose from "mongoose";
import { isNumber, isNaN, isUndefined } from "lodash";
import { isEmail, isNumeric } from "validator";

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

export const validateRegister = (name, phone, email, password) => {
  if (
    isUndefined(name) ||
    isUndefined(phone) ||
    isUndefined(email) ||
    isUndefined(password)
  ) {
    return {
      status: false,
      message:
        "Please enter all fields required: name, phone, email and password",
    };
  }
  if (name == "") {
    return { status: false, message: "Name is empty" };
  }
  name = name.replace(/\s/g, "");
  if (name.length == 0) {
    return { status: false, message: "Name can't be all spaces" };
  }
  if (phone == "") {
    return { status: false, message: "Phone is empty" };
  }
  if (isNaN(phone) || !isNumeric(phone) || phone.length != 10) {
    return { status: false, message: "Phone is invalid" };
  }
  if (email == "") {
    return { status: false, message: "Email is invalid" };
  }
  if (!isEmail(email)) {
    return { status: false, message: "Email is invalid" };
  }
  if (password == "") {
    return { status: false, message: "Password is empty" };
  }
  if (password.length < 6) {
    return { status: false, message: "Password is too short" };
  }
  return { status: true };
};
