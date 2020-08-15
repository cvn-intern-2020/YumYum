import { SET_ALERT, HIDE_ALERT } from "../actions/types";

const initialState = {
  message: "",
  type: "",
  showAlert: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT: {
      let { message, type } = action.payload;
      return { message, type, showAlert: true };
    }
    case HIDE_ALERT: {
      return { ...initialState };
    }
    default:
      return state;
  }
};
