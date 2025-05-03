import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
const RequireAuth = () => {
  const token = Cookies.get("token");

  return token ? <Outlet /> : <Navigate to="/dang-nhap" replace />;
};

export default RequireAuth;
