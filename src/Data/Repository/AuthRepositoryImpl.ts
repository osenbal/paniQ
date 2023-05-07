// import { User } from "@/Domain/Model/User/User";
// import { JwtToken } from "@/Domain/Model/JwtToken";
import { AuthRepository } from "@/Domain/Repository/AuthRepository";
import AuthDataSource from "@/Data/DataSource/interfaces/AuthDataSource";

export class AuthRepositoryImpl implements AuthRepository {
  dataSource: AuthDataSource;

  constructor(_datasource: AuthDataSource) {
    this.dataSource = _datasource;
  }

  async login<T>(email: string, password: string): Promise<T> {
    return await this.dataSource.login(email, password);
  }
}
