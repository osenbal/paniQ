import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store/store";

// Define a type for the slice state
interface AuthState {
  isAuth: boolean;
  accessToken: string;
  refreshToken: string;
  role: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  isAuth: false,
  accessToken: "",
  refreshToken: "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
  },
});

export const { setIsAuth, setAccessToken, setRefreshToken } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getIsAuth = (state: RootState) => state.auth.isAuth;

export default authSlice.reducer;
