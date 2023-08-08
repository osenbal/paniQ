import { IUserDataSource } from '@/Contracts/DataSource/IUserDataSource';
import { IUserRepository } from '@/Contracts/Repository/IUserRepository';
import { IGETCurrentUserResponse } from '@/Contracts/Response/IUserResponse';

export class UserRepositoryImpl implements IUserRepository {
  private dataSource: IUserDataSource;

  constructor(_datasource: IUserDataSource) {
    this.dataSource = _datasource;
  }

  public getCurrentUser(): Promise<IGETCurrentUserResponse> {
    return this.dataSource.getCurrentUser();
  }
}
