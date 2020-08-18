import mongoose from "mongoose";
import { isNumber, isNaN, isUndefined } from "lodash";
import { isEmail, isNumeric, isEmpty } from "validator";

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
  if (isEmpty(name, { ignore_whitespace: true })) {
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
  if (isEmpty(name, { ignore_whitespace: true })) {
    return { status: false, message: "Name is empty" };
  }
  if (isEmpty(phone, { ignore_whitespace: true })) {
    return { status: false, message: "Phone is empty" };
  }
  if (isNaN(phone) || !isNumeric(phone) || phone.length != 10) {
    return { status: false, message: "Phone is invalid" };
  }
  if (isEmpty(email, { ignore_whitespace: true })) {
    return { status: false, message: "Email is empty" };
  }
  if (!isEmail(email)) {
    return { status: false, message: "Email is invalid" };
  }
  if (isEmpty(password)) {
    return { status: false, message: "Password is empty" };
  }
  if (password.length < 6) {
    return { status: false, message: "Password is too short" };
  }
  return { status: true };
};

export const createGroup = (name, description) => {
  if (
    isUndefined(name) ||
    isUndefined(description)  ) {
    return {
      status: false,
      message:
        "Please enter all fields required: name, description",
    };
  }
  if (isEmpty(name, { ignore_whitespace: true })) {
    return { status: false, message: "Name is empty" };
  }
  if (name.length > 20) {
    return { status: false, message: "Name is too long" };
  }
  if (isEmpty(description, { ignore_whitespace: true })) {
    return { status: false, message: "description is empty" };
  }
  if (description.length > 100) {
    return { status: false, message: "description is too long" };
  }
  return { status: true };};

  export const validateLogin = (email, password) => {
  if (
    isUndefined(email) ||
    isUndefined(password)  ) {
    return {
      status: false,
      message:
        "Please enter all fields required: email, password",
    };
  }
  if (email == "") {
    return { status: false, message: "Email is empty" };
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
  return {status: true};
};