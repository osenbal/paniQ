import { ILoginRequest } from "../Requests/IAuthRequest";

export default interface IAuthDataSource {
  login<T>({ email, password }: ILoginRequest): Promise<T>;
}
