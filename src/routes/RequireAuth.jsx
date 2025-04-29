import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  // const user = JSON.parse(localStorage.getItem("dataUser"));
  const user = {
    role: {
      name: "admin",
    },
  }; // Mock user data for demonstration purposes
  return user.role.name === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/dang-nhap" replace />
  );
};

export default RequireAuth;
