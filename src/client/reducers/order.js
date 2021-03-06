import {
  ADD_TO_ORDER,
  SET_ORDER,
  CREATE_ORDER,
  CLEAR_ORDER,
} from "../actions/types";

const initialState = { totalPrice: 0, dishes: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
    case SET_ORDER: {
      return { totalPrice: 0, dishes: action.payload };
    }
    case ADD_TO_ORDER: {
      let updatedDish = action.payload;
      let updatedState = { ...state };
      updatedState.dishes = updatedState.dishes.map((dish) =>
        dish._id == updatedDish._id ? updatedDish : dish
      );
      updatedState.totalPrice = 0;
      for (let dish of updatedState.dishes) {
        updatedState.totalPrice =
          updatedState.totalPrice + dish.dishPrice * dish.quantity;
      }
      return {
        totalPrice: updatedState.totalPrice,
        dishes: [...updatedState.dishes],
      };
    }
    case CLEAR_ORDER: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
};
