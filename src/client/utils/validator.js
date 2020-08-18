import {
    GROUP_NAME_MAX_LENGTH,
    GROUP_DESCRIPTION_MAX_LENGTH,
    DISH_MAX_LENGTH,
    NAME_MAX_LENGTH,
    PHONE_MAX_LENGTH,
    PRICE_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
  } from "../constant";
  import validator from "validator";
  
  export const validateGroup = (name, description) => {
    //validate name
    if (name == "") {
      return { status: false, message: "Group's name is empty" };
    }
    let cleanName = name.replace(/\s/g, "");
    if (cleanName.length == 0) {
      return { status: false, message: "Group name not allow all space" };
    }
    if (name.length > GROUP_NAME_MAX_LENGTH) {
      return {
        status: false,
        message: `Group name not longer than ${GROUP_NAME_MAX_LENGTH}`,
      };
    }
    //validate description
    if (description == "") {
      return { status: false, message: "Group's description is empty" };
    }
  
    let cleanDescription = description.replace(/\s/g, "");
    if (cleanDescription.length == 0) {
      return { status: false, message: "Description not allow all space" };
    }
    if (description.length > GROUP_DESCRIPTION_MAX_LENGTH) {
      return {
        status: false,
        message: `Description not longer than ${GROUP_DESCRIPTION_MAX_LENGTH}`,
      };
    }
    return { status: true };
  };
  
  export const validateDish = (name, price) => {
    //validate name
    if (name == "") {
      return { status: false, message: "Name is empty" };
    }
    let cleanName = name.replace(/\s/g, "");
    if (cleanName.length == 0) {
      return { status: false, message: "Name not allow all space" };
    }
    if (name.length > DISH_MAX_LENGTH) {
      return {
        status: false,
        message: `Dish name not longer than ${DISH_MAX_LENGTH}`,
      };
    }
    //validate price
    if (price == "") {
      return { status: false, message: "Price is empty" };
    }
    if (!validator.isNumeric(price) || price < 0) {
      return { status: false, message: "Price is not numeric or smaller than 0" };
    }
    if (price.length > PRICE_MAX_LENGTH) {
      return {
        status: false,
        message: `Price cannot be more than ${PRICE_MAX_LENGTH} character`,
      };
    }
    return { status: true };
  };
  
  export const validateSignUp = (email, password, name, phone) => {
    //validate email
    if (email == "") {
      return { status: false, message: "Email is empty" };
    }
    if (!validator.isEmail(email)) {
      return { status: false, message: "Invalid email" };
    }
    if (email.length > EMAIL_MAX_LENGTH) {
      return {
        status: false,
        message: `Email can not be more than ${EMAIL_MAX_LENGTH} character`,
      };
    }
    //validate password
  
    if (password == "") {
      return { status: false, message: "Password is empty" };
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        status: false,
        message: `Password must be ${PASSWORD_MIN_LENGTH} character at least`,
      };
    }
    if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        status: false,
        message: `Password can not be more than ${PASSWORD_MAX_LENGTH} character`,
      };
    }
    //validate name
  
    if (name == "") {
      return { status: false, message: "Name is empty" };
    }
    let cleanName = name.replace(/\s/g, "");
    if (cleanName.length == 0) {
      return { status: false, message: "Name not allow all are white space" };
    }
    if (name.length > NAME_MAX_LENGTH) {
      return {
        status: false,
        message: `Name not longer than ${NAME_MAX_LENGTH}`,
      };
    }
    //validate phone
  
    if (phone == "") {
      return { status: false, message: "Phone is empty" };
    }
    let cleanPhone = phone.replace(/\s/g, "");
    if (cleanPhone.length == 0) {
      return {
        status: false,
        message: "Phone number not allow all are white space",
      };
    }
    if (!validator.isNumeric(phone)) {
      return {
        status: false,
        message: "Phone number must be numeric",
      };
    }
    if (phone.length != PHONE_MAX_LENGTH) {
      return {
        status: false,
        message: `Phone number must be ${PHONE_MAX_LENGTH} number`,
      };
    }
  
    return { status: true };
  };
  