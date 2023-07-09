import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUseCaseImpl } from "@/Domain/UseCase/Auth/AuthUseCaseImpl";
import { useAppDispatch, useAppSelector } from "@/Domain/Store/hooks";
import {
  setIsAuth,
  setAccessToken,
  setRefreshToken,
} from "@/Domain/Reducer/authSlice";
import { ILoginRequest } from "@/Contracts/Requests/IAuthRequest";
import { getAccessToken } from "@/Data/DataSource/Cookie/JWT.cookie";
import { toast } from "react-toastify";

export default function LoginViewModel() {
  const authUseCase = AuthUseCaseImpl.getInstance();

  // useContext
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // global state
  const { isAuth } = useAppSelector((state) => state.auth);

  // local state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ILoginRequest>({
    email: "",
    password: "",
  });

  // lifecycle
  useEffect(() => {
    if (isAuth && getAccessToken() !== "") {
      navigate("/", {
        replace: true,
      });
    }
  }, [isAuth]);

  // methods
  const login = async () => {
    if (email === "" && password === "") {
      setErrors({
        ...errors,
        email: "email tidak boleh kosong",
        password: "Password tidak boleh kosong",
      });
    }

    if (email === "") {
      setErrors({
        ...errors,
        email: "email tidak boleh kosong",
      });
    }

    if (password === "") {
      setErrors({
        ...errors,
        password: "Password tidak boleh kosong",
      });
    }

    if (email.length > 0 && password.length > 0) {
      setErrors({
        email: "",
        password: "",
      });

      try {
        const responseLogin = await authUseCase.login({ email, password });
        // set global state auth if login success
        if (responseLogin?.status === true && responseLogin.data != null) {
          toast.success("Login Success");
          dispatch(setAccessToken(responseLogin.data.access_token));
          dispatch(setRefreshToken(responseLogin.data.refresh_token));
          dispatch(setIsAuth(true));
        } else {
          toast.warning(responseLogin.message);
        }
      } catch (error) {
        toast.error("Terjadi Kesalahan");
        console.log("Error : ", error);
      }
    }
  };

  return {
    login,
    email,
    setEmail,
    password,
    setPassword,
    errors,
  };
}
