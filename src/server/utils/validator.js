import mongoose from "mongoose";
import { isNumber, isNaN, isUndefined } from "lodash";
import { isEmail, isNumeric, isEmpty } from "validator";
import {
  PHONE_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  NAME_MAX_LENGTH,
  GROUP_DESCRIPTION_MAX_LENGTH,
  GROUP_NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  DISH_MAX_LENGTH,
  PRICE_MAX_LENGTH,
} from "../constants/input";

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
  if (name.length > DISH_MAX_LENGTH) {
    return {
      status: false,
      message: `Dish name is longer than ${DISH_MAX_LENGTH} characters`,
    };
  }
  if (price.length > PRICE_MAX_LENGTH) {
    return {
      status: false,
      message: `Dish price is longer than ${PRICE_MAX_LENGTH} characters`,
    };
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
  if (name.length > NAME_MAX_LENGTH) {
    return {
      status: false,
      message: `Name is longer than ${NAME_MAX_LENGTH} characters`,
    };
  }
  if (isEmpty(phone, { ignore_whitespace: true })) {
    return { status: false, message: "Phone is empty" };
  }
  if (isNaN(phone) || !isNumeric(phone) || phone.length != PHONE_MAX_LENGTH) {
    return { status: false, message: "Phone is invalid" };
  }
  if (isEmpty(email, { ignore_whitespace: true })) {
    return { status: false, message: "Email is empty" };
  }
  if (email.length > EMAIL_MAX_LENGTH) {
    return {
      status: false,
      message: `Email is longer than ${EMAIL_MAX_LENGTH} characters`,
    };
  }
  if (!isEmail(email)) {
    return { status: false, message: "Email is invalid" };
  }
  if (isEmpty(password)) {
    return { status: false, message: "Password is empty" };
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      status: false,
      message: `Password is shorter than ${PASSWORD_MIN_LENGTH} characters`,
    };
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return {
      status: false,
      message: `Password is longer than ${PASSWORD_MAX_LENGTH} characters`,
    };
  }
  return { status: true };
};

export const createGroup = (name, description) => {
  if (isUndefined(name) || isUndefined(description)) {
    return {
      status: false,
      message: "Please enter all fields required: name, description",
    };
  }
  if (isEmpty(name, { ignore_whitespace: true })) {
    return { status: false, message: "Name is empty" };
  }
  if (name.length > GROUP_NAME_MAX_LENGTH) {
    return {
      status: false,
      message: `Name is longer than ${GROUP_NAME_MAX_LENGTH} characters`,
    };
  }
  if (isEmpty(description, { ignore_whitespace: true })) {
    return { status: false, message: "description is empty" };
  }
  if (description.length > GROUP_DESCRIPTION_MAX_LENGTH) {
    return {
      status: false,
      message: `description is longer than ${GROUP_DESCRIPTION_MAX_LENGTH} characters`,
    };
  }
  return { status: true };
};

export const validateLogin = (email, password) => {
  if (isUndefined(email) || isUndefined(password)) {
    return {
      status: false,
      message: "Please enter all fields required: email, password",
    };
  }
  if (isEmpty(email)) {
    return { status: false, message: "Email is empty" };
  }
  if (email.length > EMAIL_MAX_LENGTH) {
    return {
      status: false,
      message: `Email is longer than ${EMAIL_MAX_LENGTH} characters`,
    };
  }
  if (!isEmail(email)) {
    return { status: false, message: "Email is invalid" };
  }
  if (isEmpty(password)) {
    return { status: false, message: "Password is empty" };
  }
  if (password.length < PASSWORD_MAX_LENGTH) {
    return {
      status: false,
      message: `Password is shorter than ${PASSWORD_MAX_LENGTH} characters`,
    };
  }
  return { status: true };
};
