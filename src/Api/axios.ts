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

// create instance of axios
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 1000,
});

// handle request
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

// handle response
instance.interceptors.response.use(
  (response) => {
    // handle successful response here
    return response;
  },
  async (error) => {
    // handle error requests here
    const { status, config } = error.response!;
    switch (status) {
      case 400:
        break;
      case 401:
        config._retry = true;
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
            config.headers.Authorization = `Bearer ${newAccressToken.data.data.access_token}`;
          }

          return axios(config);
        } catch (error) {
          // handle error when failed to refresh token
          deleteAccessToken();
          deleteRefreshToken();
          deleteIsAuth();
        }
        break;
      case 403:
        error.response.data = {
          message: "Forbidden",
        };
        break;
      case 404:
        error.response.data = {
          message: "Not found",
        };
        break;
      case 500:
        error.response.data = {
          message: "Internal server error",
        };
        break;
    }

    return Promise.reject(error);
  }
);

// export instance
export default instance;
