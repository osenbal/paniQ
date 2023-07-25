import { ILoginRequest } from "../Requests/IAuthRequest";
import { ILoginResponse } from "../Response/IAuthResponse";
export default interface IAuthDataSource {
  login({ email, password }: ILoginRequest): Promise<ILoginResponse>;
}
