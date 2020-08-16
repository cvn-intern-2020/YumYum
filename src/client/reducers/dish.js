import {
  GET_DISH,
  ADD_DISH,
  DELETE_DISH,
  UPDATE_DISH_TO_EDIT,
  ADD_EDITED_DISH,
  DELETE_EDITED_DISH,
  EDIT_DISH,
} from "../actions/types";

const initialState = {
  userDishes: [],
  editedDishes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DISH: {
      return { ...state, userDishes: action.payload };
    }
    case ADD_DISH: {
      return { ...state, userDises: [action.payload, ...state.userDishes] };
    }
    case DELETE_DISH: {
      return {
        ...state,
        userDishes: [
          ...state.userDishes.filter((dish) => dish._id != action.payload),
        ],
      };
    }
    case UPDATE_DISH_TO_EDIT: {
      return {
        ...state,
        editedDishes: [...action.payload],
      };
    }
    case ADD_EDITED_DISH: {
      return {
        ...state,
        editedDishes: [action.payload, ...state.editedDishes],
      };
    }
    case DELETE_EDITED_DISH: {
      return {
        ...state,
        editedDishes: [
          ...state.editedDishes.filter((dish) => dish._id != action.payload),
        ],
      };
    }
    case EDIT_DISH: {
      return {
        ...state,
        editedDishes: [],
      };
    }
    default: {
      return state;
    }
  }
};
