// import { User } from "../Model/User/User";
// import { JwtToken } from "../Model/JwtToken";

export interface AuthRepository {
  login<T>(email: string, password: string): Promise<T>;
}
