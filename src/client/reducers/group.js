import {
  SET_GROUP,
  CREATE_GROUP,
  SET_ORDER_TO_GROUP,
  ADD_MEMBER,
} from "../actions/types";

const initialState = {
  ownerId: "",
  showAddMemberModal: false,
  showConfirmOrderModal: false,
  showEditDishesModal: false,
  showOrdersListModal: false,
  showMemberListModal: false,
  dishes: [],
  orders: [],
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
    case SET_ORDER_TO_GROUP: {
      return { ...state, orders: action.payload };
    }
    default:
    case ADD_MEMBER:
    case CREATE_GROUP: {
      return state;
    }
  }
};
