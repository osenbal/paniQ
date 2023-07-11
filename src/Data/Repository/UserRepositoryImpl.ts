import { IUserDataSource } from "@/Contracts/DataSource/IUserDataSource";
import { IUserRepository } from "@/Contracts/Repository/IUserRepository";

export class UserRepositoryImpl implements IUserRepository {
  private dataSource: IUserDataSource;

  constructor(_datasource: IUserDataSource) {
    this.dataSource = _datasource;
  }

  public getCurrentUser<T>(): Promise<T> {
    return this.dataSource.getCurrentUser();
  }
}
