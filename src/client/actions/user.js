import { SET_USER, CLEAR_USER } from "./types";
import { getUserRequest } from "../request/user";

export const setUser = (token) => async (dispatch) => {
  let getUserResult = await getUserRequest(token);
  if (!getUserResult.status) {
    if (getUserResult.errCode == 401) {
      clearUser();
    } else {
      console.log(getUserResult.message);
    }
  } else {
    dispatch({ type: SET_USER, payload: { token, ...getUserResult.userData } });
  }
};

export const clearUser = () => (dispatch) => {
  dispatch({ type: CLEAR_USER });
};
