import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../Reducer/authSlice';
import { globalSlice } from './globalSlice';
import { postSlice } from './postSlice';
import { notificationSlice } from './notificationSlice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  global: globalSlice.reducer,
  post: postSlice.reducer,
  notification: notificationSlice.reducer,
});
