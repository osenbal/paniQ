import { createSlice } from "@reduxjs/toolkit";
import NotificationLocalStorage from "@/Data/DataSource/LocalStorage/NotificationLocalStorage";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../Store/store";

// Define a type for the slice state

const notificationPermission = NotificationLocalStorage.getNotifications();
interface GlobalState {
  notificationPermission: NotificationPermission;
}

// Define the initial state using that type
const initialState: GlobalState = {
  notificationPermission,
};

export const globalSlice = createSlice({
  name: "global",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotificationPermission: (state, action) => {
      NotificationLocalStorage.setNotifications(action.payload);
      state.notificationPermission = action.payload;
    },
  },
});

export const { setNotificationPermission } = globalSlice.actions;

export default globalSlice.reducer;
