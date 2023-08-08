import { IGETCurrentUserResponse } from '../Response/IUserResponse';
export interface IUserDataSource {
  getCurrentUser(): Promise<IGETCurrentUserResponse>;
}
