import IAuthDataSource from "@/Contracts/DataSource/IAuthDataSource";
import request from "@/Api/request";
import { isAxiosError } from "axios";
import { ILoginRequest } from "@/Contracts/Requests/IAuthRequest";
import { AUTH_END_POINT } from "@/Api/LIST_END_POINT";
import { ILoginResponse } from "@/Contracts/Response/IAuthResponse";

export default class AuthDataSourceImpl implements IAuthDataSource {
  private static instance: AuthDataSourceImpl;

  static getInstance(): AuthDataSourceImpl {
    if (!AuthDataSourceImpl.instance) {
      AuthDataSourceImpl.instance = new AuthDataSourceImpl();
    }
    return AuthDataSourceImpl.instance;
  }

  public async login({
    email,
    password,
  }: ILoginRequest): Promise<ILoginResponse> {
    try {
      const r = await request.post<ILoginResponse>(AUTH_END_POINT.POST_LOGIN, {
        email,
        password,
      });
      return r;
    } catch (err) {
      if (isAxiosError<ILoginResponse>(err) && err.response) {
        return err.response?.data;
      }
      // if error is not axios error
      throw err;
    }
  }
}
