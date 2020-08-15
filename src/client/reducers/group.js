import { SET_GROUP } from "../actions/types";

const initialState = {
  ownerId: "",
  showAddMemberModal: false,
  showConfirmOrderModal: false,
  showEditDishesModal: false,
  showOrdersListModal: false,
  showMemberListModal: false,
  dishes: [],
  userDishes: [],
  editedDishes: [],
  orders: [],
  totalPrice: 0,
  users: [],
  _id: "",
  name: "",
  description: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUP: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};
