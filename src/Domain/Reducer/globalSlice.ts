import { createSlice } from '@reduxjs/toolkit';
interface GlobalState {}

// Define the initial state using that type
const initialState: GlobalState = {};

export const globalSlice = createSlice({
  name: 'global',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// export const { setNotificationPermission } = globalSlice.actions;

export default globalSlice.reducer;
