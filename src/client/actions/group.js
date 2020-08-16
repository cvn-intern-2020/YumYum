import {
  SET_GROUP,
  CREATE_GROUP,
  SET_ORDER_TO_GROUP,
  ADD_MEMBER,
} from "./types";
import {
  getGroupRequest,
  createGroupRequest,
  addMemberRequest,
} from "../request/group";
import convertOderFormat from "../utils/convertOrderFormat";
import { setOrder } from "./order";
import { setUser } from "./user";
import { setAlert } from "./alert";
import { getOrderByGroupIdRequest } from "../request/order";

export const setGroup = (groupId) => async (dispatch) => {
  let getGroupResult = await getGroupRequest(groupId);
  if (!getGroupResult.status) {
    dispatch(setAlert("danger", getGroupResult.message));
  } else {
    let groupData = getGroupResult.groupData;
    groupData.dishes = convertOderFormat(groupData.dishes);
    dispatch({ type: SET_GROUP, payload: { ...groupData } });
    dispatch(setOrder());
  }
};

export const setOrderToGroup = (groupId) => async (dispatch) => {
  let getOrderByGroupIdResult = await getOrderByGroupIdRequest(groupId);
  if (!getOrderByGroupIdResult.status) {
    dispatch(setAlert("danger", getOrderByGroupIdResult.message));
  } else {
    let groupOrdersData = getOrderByGroupIdResult.groupOrdersData;
    dispatch({ type: SET_ORDER_TO_GROUP, payload: groupOrdersData });
  }
};

export const addMember = (groupId, email) => async (dispatch) => {
  let addMemberResult = await addMemberRequest(groupId, email);
  dispatch(
    setAlert(
      addMemberResult.status ? "success" : "danger",
      addMemberResult.message
    )
  );
  dispatch(setGroup(groupId));
  dispatch({ type: ADD_MEMBER });
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
