import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthUseCaseImpl } from "@/Domain/UseCase/Auth/AuthUseCaseImpl";
import { asyncLogin } from "@/Domain/Reducer/authSlice";
import { useAppDispatch, useAppSelector } from "@/Domain/Store/hooks";
import { ILoginRequest } from "@/Contracts/Requests/IAuthRequest";
import { getAccessToken } from "@/Data/DataSource/Cookie/JWT.cookie";
import { toast } from "react-toastify";

export default function LoginViewModel() {
  // useContext
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // global state
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);

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
  }, [isAuth, navigate]);

  // methods
  const login = async () => {
    if (email === "" && password === "") {
      setErrors({
        ...errors,
        email: "email tidak boleh kosong",
        password: "Password tidak boleh kosong",
      });
      return;
    }

    if (email === "") {
      setErrors({
        ...errors,
        email: "email tidak boleh kosong",
      });
      return;
    }

    if (password === "") {
      setErrors({
        ...errors,
        password: "Password tidak boleh kosong",
      });
      return;
    }

    if (email.length > 0 && password.length > 0) {
      setErrors({
        email: "",
        password: "",
      });

      try {
        dispatch(asyncLogin({ email, password }));
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
    isLoading,
  };
}
