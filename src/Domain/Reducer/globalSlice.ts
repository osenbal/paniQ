import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../Store/store";

// Define a type for the slice state
interface GlobalState {}

// Define the initial state using that type
const initialState: GlobalState = {};

export const globalSlice = createSlice({
  name: "global",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// export const { setSearch } = globalSlice.actions;

export default globalSlice.reducer;
