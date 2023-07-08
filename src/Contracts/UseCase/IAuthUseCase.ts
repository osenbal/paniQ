import { ILoginRequest } from "@/Contracts/Requests/IAuthRequest";
import { ILoginResponse } from "@/Contracts/Response/IAuthResponse";

export interface IAuthUseCase {
  login: ({ email, password }: ILoginRequest) => Promise<ILoginResponse>;
}
