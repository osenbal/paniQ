import { IAuthRepository } from "@/Contracts/Repository/IAuthRepository";
import { ILoginResponse } from "@/Contracts/Response/IAuthResponse";
import { ILoginRequest } from "@/Contracts/Requests/IAuthRequest";

export interface ILoginUseCase {
  invoke: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<ILoginResponse>;
}

export class Login implements ILoginUseCase {
  private authRepo: IAuthRepository;

  constructor(_authRepo: IAuthRepository) {
    this.authRepo = _authRepo;
  }

  public async invoke({
    email,
    password,
  }: ILoginRequest): Promise<ILoginResponse> {
    return this.authRepo.login({ email, password });
  }
}
