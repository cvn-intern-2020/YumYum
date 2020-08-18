import { SET_USER, CLEAR_USER } from "./types";
import { getUserRequest } from "../request/user";
import { signOutRequest } from "../request/auth";

export const setUser = () => async (dispatch) => {
  const getUserResult = await getUserRequest();
  if (!getUserResult.status) {
    if (getUserResult.errCode == 401) {
      clearUser();
      return false;
    }
  } else {
    dispatch({ type: SET_USER, payload: { ...getUserResult.userData } });
    localStorage.setItem("isLogin", "true");
    return getUserResult.userData.token;
  }
};

export const clearUser = () => async (dispatch) => {
  localStorage.setItem("isLogin", "false");
  await signOutRequest();
  dispatch({ type: CLEAR_USER });
};
