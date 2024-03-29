import { IAuthRepository } from "@/Contracts/Repository/IAuthRepository";
import AuthDataSource from "@/Contracts/DataSource/IAuthDataSource";
import { ILoginRequest } from "@/Contracts/Requests/IAuthRequest";

export class AuthRepositoryImpl implements IAuthRepository {
  private dataSource: AuthDataSource;

  constructor(_datasource: AuthDataSource) {
    this.dataSource = _datasource;
  }

  public login<T>({ email, password }: ILoginRequest): Promise<T> {
    return this.dataSource.login({ email, password });
  }
}
