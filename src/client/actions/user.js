import { SET_USER, CLEAR_USER } from "./types";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const setUser = (token) => (dispatch) => {
  const decoded = jwt_decode(token);
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
