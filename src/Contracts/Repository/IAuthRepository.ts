import { ILoginRequest } from "../Requests/IAuthRequest";

export interface IAuthRepository {
  login<T>({ email, password }: ILoginRequest): Promise<T>;
}
