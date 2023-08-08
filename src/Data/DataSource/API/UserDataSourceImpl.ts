import { USER_END_POINT } from '@/Api/LIST_END_POINT';
import { IUserDataSource } from '@/Contracts/DataSource/IUserDataSource';
import request from '@/Api/request';
import { isAxiosError } from 'axios';
import { IGETCurrentUserResponse } from '@/Contracts/Response/IUserResponse';

export class UserDataSourceImpl implements IUserDataSource {
  private static instance: UserDataSourceImpl;

  static getInstance(): UserDataSourceImpl {
    if (!UserDataSourceImpl.instance) {
      UserDataSourceImpl.instance = new UserDataSourceImpl();
    }
    return UserDataSourceImpl.instance;
  }

  public async getCurrentUser(): Promise<IGETCurrentUserResponse> {
    try {
      const r = await request.get<IGETCurrentUserResponse>(
        USER_END_POINT.CURRENT_USER
      );

      return r;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        return err.response?.data;
      }
      throw err;
    }
  }
}
