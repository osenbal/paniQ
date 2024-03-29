// apiInterceptor.ts
import axios from "axios";
import {
  getRefreshToken,
  setAccessToken,
  deleteAccessToken,
  deleteRefreshToken,
  deleteIsAuth,
  getAccessToken,
} from "@/Data/DataSource/Cookie/JWT.cookie";
import { ILoginResponse } from "@/Contracts/Response/IAuthResponse";
import { AUTH_END_POINT } from "./LIST_END_POINT";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    // handle successful request here
    if (getAccessToken() !== "") {
      config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }
    return config;
  },
  (error) => {
    // handle error requests here
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // handle successful response here
    return response;
  },
  async (error) => {
    // console.log("error interceptor ", error);
    // handle error requests here
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // handle unauthorized error
      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          // handle error when refresh token is not available
          throw error;
        }

        // request new access token with refresh token
        const newAccressToken = await instance.get<ILoginResponse>(
          AUTH_END_POINT.GET_REFRESH_TOKEN,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        if (newAccressToken.data.data != null) {
          // set access token to cookie
          setAccessToken(
            newAccressToken.data.data.access_token,
            newAccressToken.data.data.refresh_token
          );
          // set original request header with new access token
          originalRequest.headers.Authorization = `Bearer ${newAccressToken.data.data.access_token}`;
        }

        return axios(originalRequest);
      } catch (error) {
        // handle error when failed to refresh token
        deleteAccessToken();
        deleteRefreshToken();
        deleteIsAuth();

        return Promise.reject(error);
      }
    } else {
      if (error.response.status === 404) {
        error.response.data = {
          message: "Not found",
        };
      }

      if (error.response.status === 403) {
        error.response.data = {
          message: "Forbidden",
        };
      }

      if (error.response.status === 500) {
        error.response.data = {
          message: "Internal server error",
        };
      }

      return Promise.reject(error);
    }
  }
);

export default instance;
