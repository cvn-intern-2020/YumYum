import { GET_DISH } from "../actions/types";

const initialState = {
  userDishes: [],
  editedDishes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DISH: {
      return { ...state, userDishes: action.payload };
    }

    default: {
      return state;
    }
  }
};
