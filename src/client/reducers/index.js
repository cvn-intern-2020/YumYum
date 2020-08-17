import { combineReducers } from "redux";
import user from "./user";
import alert from "./alert";
import group from "./group";
import order from "./order";
import dish from "./dish";

export default combineReducers({ alert, user, group, order, dish });
