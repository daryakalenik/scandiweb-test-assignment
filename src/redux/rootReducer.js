import { combineReducers } from "@reduxjs/toolkit";
import { mainReducer } from "../ducks/main/reducer";

export const rootReducer = combineReducers({
  main: mainReducer,
});
