import { IAuthRepository } from "@/Contracts/Repository/IAuthRepository";
import AuthDataSource from "@/Contracts/DataSource/IAuthDataSource";
import { ILoginRequest } from "@/Contracts/Requests/IAuthRequest";
import { ILoginResponse } from "@/Contracts/Response/IAuthResponse";

export class AuthRepositoryImpl implements IAuthRepository {
  private dataSource: AuthDataSource;

  constructor(_datasource: AuthDataSource) {
    this.dataSource = _datasource;
  }

  public login({ email, password }: ILoginRequest): Promise<ILoginResponse> {
    return this.dataSource.login({ email, password });
  }
}
