import { useAppSelector } from "../../Domain/Store/hooks";
import { Outlet, Navigate } from "react-router-dom";

export const AuthMiddleware = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
