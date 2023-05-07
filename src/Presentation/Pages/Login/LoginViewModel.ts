import { useState } from "react";
import { Login } from "@/Domain/UseCase/Auth/Login";
import { AuthRepositoryImpl } from "@/Data/Repository/AuthRepositoryImpl";
import AuthAPIDataSourceImpl from "@/Data/DataSource/API/AuthAPIDataSourceImpl";

export default function LoginViewModel() {
  const [nim, setNim] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const UseCase = new Login(
    new AuthRepositoryImpl(new AuthAPIDataSourceImpl())
  );

  async function login<T>(): Promise<T> {
    return await UseCase.invoke({ nim, password });
  }

  return {
    login,
    nim,
    setNim,
    password,
    setPassword,
  };
}
