import { useAppSelector } from "../../Domain/Store/hooks";
import { Outlet, Navigate } from "react-router-dom";
import { getIsAuth } from "@/Data/DataSource/Cookie/JWT.cookie";
import { useAppDispatch } from "../../Domain/Store/hooks";
import { setIsAuth } from "@/Domain/Reducer/authSlice";

export const AuthMiddleware = () => {
  const dispatch = useAppDispatch();

  const isAuthFromCookie = getIsAuth();

  if (isAuthFromCookie) {
    dispatch(setIsAuth(true));
  }

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
