import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/not_found_page/NotFoundPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminHomePage from "../pages/admin_home_page/AdminHomePage";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<AdminHomePage />}>
          {/* <Route path="users" element={<ManageUsers />} />
          <Route path="roles" element={<ManageRoles />} /> */}
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AdminRoutes;
