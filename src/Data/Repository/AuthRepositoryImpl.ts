import { IAuthRepository } from "@/Contracts/Repository/IAuthRepository";
import AuthDataSource from "@/Contracts/DataSource/IAuthDataSource";
import { ILoginRequest } from "@/Contracts/Requests/IAuthRequest";

export class AuthRepositoryImpl implements IAuthRepository {
  private dataSource: AuthDataSource;

  constructor(_datasource: AuthDataSource) {
    this.dataSource = _datasource;
  }

  public async login<T>({ email, password }: ILoginRequest): Promise<T> {
    return await this.dataSource.login({ email, password });
  }
}
