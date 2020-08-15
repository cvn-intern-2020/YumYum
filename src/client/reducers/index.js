import { combineReducers } from "redux";
import user from "./user";
import alert from "./alert";

export default combineReducers({ alert, user });
