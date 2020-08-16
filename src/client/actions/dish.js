import {
  GET_DISH,
  ADD_DISH,
  DELETE_DISH,
  UPDATE_DISH_TO_EDIT,
  ADD_EDITED_DISH,
  DELETE_EDITED_DISH,
  EDIT_DISH,
} from "./types";
import {
  getDishOfUserRequest,
  createDishRequest,
  deleteDishRequest,
} from "../request/dish";
import convertOderFormat from "../utils/convertOrderFormat";
import { setAlert } from "./alert";
import { setGroup } from "./group";
import { editDishesInGroupRequest } from "../request/group";

export const getDish = () => async (dispatch) => {
  let getDishOfUserResult = await getDishOfUserRequest();
  if (!getDishOfUserResult.status) {
    dispatch(setAlert("danger", getDishOfUserResult.message));
    return -1;
  }
  getDishOfUserResult.dishData = convertOderFormat(
    getDishOfUserResult.dishData
  );
  if (getDishOfUserResult.dishData.length == 0) {
    return false;
  }
  dispatch({
    type: GET_DISH,
    payload: [...getDishOfUserResult.dishData].reverse(),
  });
  return true;
};
export const addDish = (name, price) => async (dispatch) => {
  let createDishResult = await createDishRequest({
    name,
    price: price * 1000,
  });
  if (!createDishResult.status) {
    dispatch(setAlert("danger", createDishResult.message));
  } else {
    dispatch({ type: ADD_DISH, payload: createDishResult.newDish });
  }
};

export const deleteDish = (dishId) => async (dispatch) => {
  let deleteDishResult = await deleteDishRequest(dishId);
  if (!deleteDishResult.status) {
    dispatch(setAlert("danger", deleteDishResult.message));
  } else {
    dispatch({ type: DELETE_DISH, payload: dishId });
  }
};

export const updateToEditDish = () => async (dispatch, getState) => {
  let groupId = getState().group._id;
  dispatch(getDish());
  dispatch(setGroup(groupId));
  let dishes = getState().group.dishes;
  dispatch({ type: UPDATE_DISH_TO_EDIT, payload: dishes });
};

export const addEditedDish = (changeDish) => (dispatch) => {
  dispatch({ type: ADD_EDITED_DISH, payload: changeDish });
};

export const deleteEditedDish = (changeDish) => (dispatch) => {
  dispatch({ type: DELETE_EDITED_DISH, payload: changeDish._id });
};

export const editDish = () => async (dispatch, getState) => {
  let dishArray = getState().dish.editedDishes.map((dish) => dish._id);
  let groupId = getState().group._id;
  let editDishesResult = await editDishesInGroupRequest(groupId, dishArray);
  if (!editDishesResult.status) {
    dispatch(setAlert("danger", editDishesResult.message));
  } else {
    dispatch(setGroup(groupId));
    dispatch({ type: EDIT_DISH });
  }
};
