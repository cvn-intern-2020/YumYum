import { SET_USER, CLEAR_USER } from "./types";
import axios from "axios";

export const setUser = (token) => (dispatch) => {
  axios
    .get(`${process.env.API_URL}/api/users`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res, err) => {
      if (err) {
        console.log(err);
      } else {
        let userData = res.data;
        dispatch({ type: SET_USER, payload: { token, ...userData } });
      }
    });
};

export const clearUser = () => (dispatch) => {
  dispatch({ type: CLEAR_USER });
};
