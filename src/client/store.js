import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import * as actionCreators from "./actions/types";

const initialState = {};
const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
});
const middleWare = [thunk];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWare))
);

export default store;
