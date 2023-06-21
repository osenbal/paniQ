import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Login } from "@/Domain/UseCase/Auth/Login";
// import { AuthRepositoryImpl } from "@/Data/Repository/AuthRepositoryImpl";
// import AuthAPIDataSourceImpl from "@/Data/DataSource/API/AuthAPIDataSourceImpl";
import { useAppDispatch, useAppSelector } from "@/Domain/Store/hooks";
import { setIsAuth } from "@/Domain/Reducer/authSlice";

export default function LoginViewModel() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth } = useAppSelector((state) => state.auth);

  const [nim, setNim] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    nim: string;
    password: string;
  }>({
    nim: "",
    password: "",
  });

  // const UseCase = new Login(
  //   new AuthRepositoryImpl(new AuthAPIDataSourceImpl())
  // );

  async function login() {
    if (nim === "") {
      setErrors({
        ...errors,
        nim: "NIM tidak boleh kosong",
      });
    }

    if (password === "") {
      setErrors({
        ...errors,
        password: "Password tidak boleh kosong",
      });
    }

    if (nim.length > 0 && password.length > 0) {
      setErrors({
        nim: "",
        password: "",
      });

      dispatch(setIsAuth(true));
    }
    // return await UseCase.invoke({ nim, password });
  }

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [navigate, isAuth]);

  return {
    login,
    nim,
    setNim,
    password,
    setPassword,
    errors,
  };
}
