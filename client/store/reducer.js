import { combineReducers } from "redux";

import UsersReducer from "./users";

const allReducers = combineReducers({
  user: UsersReducer,
});

export default allReducers;
