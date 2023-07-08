import IAuthDataSource from "../../../Contracts/DataSource/IAuthDataSource";
import axios from "@/Api/apiInterceptor";
import { ILoginRequest } from "@/Contracts/Requests/IAuthRequest";

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
        `/auth/login`,
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
}
