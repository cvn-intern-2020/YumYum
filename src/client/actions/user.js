import { SET_USER } from "./types";
import jwt_decode from "jwt-decode";
import axios from "axios";
export const setUser = (token) => (dispatch) => {
  // Set token to Auth header
  // console.log(token);
  // setAuthToken(token);
  // // Decode token to get user data
  const decoded = jwt_decode(token);
  axios
    .get("http://localhost:3000/api/users", {
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
