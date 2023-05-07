// import { User } from "@/Domain/Model/User/User";
// import { JwtToken } from "@/Domain/Model/JwtToken";

export default interface AuthDataSource {
  // use generic return type
  login<T>(email: string, password: string): Promise<T>;
}
