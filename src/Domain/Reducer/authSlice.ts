import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store/store";
import {
  setAccessToken as setAccessTokenToCookie,
  setRefreshToken as setRefreshTokenToCookie,
  setIsAuth as setIsAuthToCookie,
  deleteAccessToken,
  deleteRefreshToken,
  deleteIsAuth,
} from "@/Data/DataSource/Cookie/JWT.cookie";
import { IUser } from "@/Contracts/Response/IUserResponse";
import { AuthUseCaseImpl } from "@/Domain/UseCase/Auth/AuthUseCaseImpl";
import { UserUseCaseImpl } from "../UseCase/User/UserUseCaseImpl";
import { toast } from "react-toastify";

const authUseCase = AuthUseCaseImpl.getInstance();
const userUseCase = UserUseCaseImpl.getInstance();

// Define a type for the slice state
interface AuthState {
  isAuth: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser | null;
  role: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

// Define the initial state using that type
const initialState: AuthState = {
  isAuth: false,
  accessToken: "",
  refreshToken: "",
  user: null,
  role: "",
  isLoading: "idle",
};

// methdos for auth
export const authMethods = {
  login: "/auth/login",
  me: "/auth/me",
};

export const asyncLogin = createAsyncThunk(
  authMethods.login,
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await authUseCase.login(data);
      if (res?.status === true) {
        // if res.status === true
        toast.success(res.message);
        return res.data;
      } else {
        // if res.status === false
        toast.error(res?.message || "Login failed");
        return rejectWithValue(res?.message || "Login failed");
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const asyncMe = createAsyncThunk(
  authMethods.me,
  async (_, { rejectWithValue }) => {
    try {
      const res = await userUseCase.getCurrentUser();
      if (res.status === true) {
        // if res.status === true
        return res.data;
      } else {
        // if res.status === false
        return rejectWithValue(res.message);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
      // save to cookie without expire
      setIsAuthToCookie(action.payload);
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      // save to cookie with 1 minute expire
      setAccessTokenToCookie(action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      // save to cookie with 3 days expire
      setRefreshTokenToCookie(action.payload);
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncLogin.pending, (state) => {
        state.isLoading = "pending";
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.isAuth = true;
        if (action?.payload) {
          state.isAuth = true;
          state.accessToken = action.payload.access_token;
          state.refreshToken = action.payload.refresh_token;

          // save to cookie without expire
          setIsAuthToCookie(true);
          // save to cookie with 1 minute expire
          setAccessTokenToCookie(action.payload.access_token);
          // save to cookie with 3 days expire
          setRefreshTokenToCookie(action.payload.refresh_token);
        } else {
          state.accessToken = "";
          state.refreshToken = "";
          state.isAuth = false;
        }
      })
      .addCase(asyncLogin.rejected, (state, _) => {
        state.isLoading = "failed";
        state.isAuth = false;
        state.accessToken = "";
        state.refreshToken = "";
        state.user = null;
        state.role = "";

        // delete from cookie
        deleteAccessToken();
        deleteRefreshToken();
        deleteIsAuth();
      });

    builder.addCase(asyncMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setIsAuth, setAccessToken, setRefreshToken, setRole, setUser } =
  authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getIsAuth = (state: RootState) => state.auth.isAuth;

export default authSlice.reducer;
