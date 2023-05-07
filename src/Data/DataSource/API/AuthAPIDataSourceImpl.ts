// import { User } from "@/Domain/Model/User/User";
// import { JwtToken } from "@/Domain/Model/JwtToken";
import AuthDataSource from "../interfaces/AuthDataSource";
import { JwtAPIEntity } from "./Entity/JwtAPIEntity";
import axios from "@/Api/axios";

interface TypedResponse<T = any> extends Response {
  json<P = T>(): Promise<P>;
}

function myFetch<T>(...args: any): Promise<TypedResponse<T>> {
  return axios(args);
}

export default class AuthDataSourceImpl implements AuthDataSource {
  login<T>(nim: string, password: string): Promise<T> {
    return myFetch<JwtAPIEntity>(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username: nim,
        password,
      }),
    }).then((response) => response.json());
  }
}
