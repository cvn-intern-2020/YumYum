import { GET_DISH } from "./types";
import { getDishOfUserRequest } from "../request/dish";
import convertOderFormat from "../utils/convertOrderFormat";

export const getDish = () => async (dispatch) => {
  let getDishOfUserResult = await getDishOfUserRequest();
  if (!getDishOfUserResult.status) {
    this.props.setAlert("danger", getDishOfUserResult.message);
    return -1;
  }
  getDishOfUserResult.dishData = convertOderFormat(
    getDishOfUserResult.dishData
  );
  if (getDishOfUserResult.dishData.length == 0) {
    return -1;
  }
  dispatch({
    type: GET_DISH,
    payload: [...getDishOfUserResult.dishData].reverse(),
  });
};

// export const hideAlert = () => (dispatch) => {
//   dispatch({ type: HIDE_ALERT });
// };
