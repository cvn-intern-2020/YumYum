import { SET_GROUP } from "./types";
import { getGroupRequest } from "../request/group";
import convertOderFormat from "../utils/convertOrderFormat";
import { setOrder } from "./order";

export const setGroup = (groupId) => async (dispatch) => {
  let getGroupResult = await getGroupRequest(groupId);
  if (!getGroupResult.status) {
    this.props.setAlert("danger", getGroupResult.message);
  } else {
    let groupData = getGroupResult.groupData;
    groupData.dishes = convertOderFormat(groupData.dishes);
    dispatch({ type: SET_GROUP, payload: { ...groupData } });
    dispatch(setOrder());
  }
};
