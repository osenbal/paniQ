import { IAuthUseCase } from "@/Contracts/UseCase/IAuthUseCase";
import { ILoginRequest } from "@/Contracts/Requests/IAuthRequest";
import { AuthRepositoryImpl } from "@/Data/Repository/AuthRepositoryImpl";
import AuthAPIDataSourceImpl from "@/Data/DataSource/API/AuthAPIDataSourceImpl";
import { ILoginResponse } from "@/Contracts/Response/IAuthResponse";
import { Login } from "./LoginUseCase";

export class AuthUseCaseImpl implements IAuthUseCase {
  private static instance: AuthUseCaseImpl;
  private authRepo = new AuthRepositoryImpl(
    AuthAPIDataSourceImpl.getInstance()
  );
  private loginUseCase = new Login(this.authRepo);

  static getInstance(): AuthUseCaseImpl {
    if (!AuthUseCaseImpl.instance) {
      AuthUseCaseImpl.instance = new AuthUseCaseImpl();
    }
    return AuthUseCaseImpl.instance;
  }

  public async login({
    email,
    password,
  }: ILoginRequest): Promise<ILoginResponse> {
    return await this.loginUseCase.invoke({ email, password });
  }
}
