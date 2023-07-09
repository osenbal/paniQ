import { USER_END_POINT } from "@/Api/LIST_END_POINT";
import { IUserDataSource } from "@/Contracts/DataSource/IUserDataSource";
import axios from "@/Api/apiInterceptor";
import { getAccessToken } from "../Cookie/JWT.cookie";

export class UserDataSourceImpl implements IUserDataSource {
  private static instance: UserDataSourceImpl;

  static getInstance(): UserDataSourceImpl {
    if (!UserDataSourceImpl.instance) {
      UserDataSourceImpl.instance = new UserDataSourceImpl();
    }
    return UserDataSourceImpl.instance;
  }

  getCurrentUser<T>(): Promise<T> {
    return axios
      .get(USER_END_POINT.CURRENT_USER, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
}
