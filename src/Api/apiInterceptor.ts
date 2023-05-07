// apiInterceptor.ts
import axios from "./axios";
import {
  getRefreshToken,
  setAccessToken,
} from "@/Data/DataSource/Cookie/JWT.cookie";

axios.interceptors.response.use(
  (response) => {
    // handle successful response here
    return response;
  },
  async (error) => {
    // handle error requests here
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // handle unauthorized error
      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          // handle error when refresh token is not available
          throw error;
        }

        // request new access token with refresh token
        const newAccressToken = await axios.post("/auth/refresh", {
          headers: {
            "Content-Type": "application/json",
            "refresh-token": refreshToken,
          },
        });

        // set access token to cookie
        setAccessToken(
          newAccressToken.data.accessToken,
          newAccressToken.data.expiresIn
        );

        // set original request header with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccressToken.data.accessToken}`;

        return axios(originalRequest);
      } catch (error) {
        // handle error when failed to refresh token
        throw error;
      }
    }
  }
);

export default axios;
