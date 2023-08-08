import { IGETCurrentUserResponse } from '../Response/IUserResponse';
export interface IUserRepository {
  getCurrentUser(): Promise<IGETCurrentUserResponse>;
}
