import { SET_ALERT, HIDE_ALERT } from "./types";

export const setAlert = (type, message) => (dispatch) => {
  dispatch({ type: SET_ALERT, payload: { type, message } });
};

export const hideAlert = () => (dispatch) => {
  dispatch({ type: HIDE_ALERT });
};
