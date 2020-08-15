import { SET_GROUP, CREATE_GROUP } from "./types";
import { getGroupRequest, createGroupRequest } from "../request/group";
import convertOderFormat from "../utils/convertOrderFormat";
import { setOrder } from "./order";
import { setUser } from "./user";
import { setAlert } from "./alert";

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

export const createGroup = ({ name, description }) => async (dispatch) => {
  let createGroupResult = await createGroupRequest({ name, description });
  if (!createGroupResult.status) {
    dispatch(setAlert("danger", createGroupResult.message));
    return -1;
  }
  dispatch({ type: CREATE_GROUP });
  dispatch(setUser());
};
