import { SET_USER } from "../actions/types";

const initialState = {
  _id: "",
  name: "",
  email: "",
  phone: "",
  token: localStorage.getItem("token") || "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
