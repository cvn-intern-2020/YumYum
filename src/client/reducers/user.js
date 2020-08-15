import { SET_USER, CLEAR_USER } from "../actions/types";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const initialState = {
  _id: "",
  name: "",
  email: "",
  phone: "",
  token: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      console.log(action.payload);
      action.payload.groups = action.payload.groups.reverse();
      return { ...state, ...action.payload };
    }
    case CLEAR_USER: {
      return { ...initialState, token: "" };
    }
    default: {
      return { ...initialState };
    }
  }
};
