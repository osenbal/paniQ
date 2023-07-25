import { ILoginRequest } from "../Requests/IAuthRequest";
import { ILoginResponse } from "../Response/IAuthResponse";
export interface IAuthRepository {
  login({ email, password }: ILoginRequest): Promise<ILoginResponse>;
}
