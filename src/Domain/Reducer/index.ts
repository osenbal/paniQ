import { combineReducers } from "@reduxjs/toolkit";
import { counterSlice } from "../Reducer/counterSlice";
import { authSlice } from "../Reducer/authSlice";

export const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  auth: authSlice.reducer,
});
