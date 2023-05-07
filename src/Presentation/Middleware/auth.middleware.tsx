import { useAppSelector } from "../../Domain/Store/hooks";
import { getIsAuth } from "../../Domain/Reducer/authSlice";
import { Outlet, Navigate } from "react-router-dom";

export const AuthMiddleware = () => {
  const isAuth = useAppSelector(getIsAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
