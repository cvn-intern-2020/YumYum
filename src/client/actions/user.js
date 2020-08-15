import { SET_USER, CLEAR_USER } from "./types";
import { getUserRequest } from "../request/user";

export const setUser = () => async (dispatch) => {
  let getUserResult = await getUserRequest();
  if (!getUserResult.status) {
    if (getUserResult.errCode == 401) {
      clearUser();
      return false;
    }
  } else {
    dispatch({ type: SET_USER, payload: { ...getUserResult.userData } });
    return getUserResult.userData.token;
  }
};

export const clearUser = () => (dispatch) => {
  dispatch({ type: CLEAR_USER });
};
