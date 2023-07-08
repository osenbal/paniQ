import IAuthDataSource from "@/Contracts/DataSource/IAuthDataSource";
import axios from "@/Api/apiInterceptor";
import { ILoginRequest } from "@/Contracts/Requests/IAuthRequest";
import { AUTH_END_POINT } from "@/Api/LIST_END_POINT";
import { getRefreshToken } from "@/Data/DataSource/Cookie/JWT.cookie";

export default class AuthDataSourceImpl implements IAuthDataSource {
  private static instance: AuthDataSourceImpl;

  static getInstance(): AuthDataSourceImpl {
    if (!AuthDataSourceImpl.instance) {
      AuthDataSourceImpl.instance = new AuthDataSourceImpl();
    }
    return AuthDataSourceImpl.instance;
  }

  login<T>({ email, password }: ILoginRequest): Promise<T> {
    return axios
      .post(
        AUTH_END_POINT.POST_LOGIN,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  refreshToken<T>(): Promise<T> {
    return axios
      .get(AUTH_END_POINT.GET_REFRESH_TOKEN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
}
