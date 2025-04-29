import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import NotFoundPage from "../pages/not_found_page/NotFoundPage";
import AdminHomePage from "../pages/admin/admin_home_page/AdminHomePage";
import ManageCartsPage from "../pages/admin/manage_carts_page/ManageCartsPage";
import ManageCategoriesPage from "../pages/admin/manage_categories_page/ManageCategoriesPage";
import ManageProductsPage from "../pages/admin/manage_products_page/ManageProductsPage";
import ResetPasswordPage from "../pages/reset_password_page/ResetPasswordPage";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<AdminHomePage />} />
        <Route path="tong-quan" element={<AdminHomePage />} />
        <Route path="san-pham" element={<ManageProductsPage />} />
        <Route path="don-hang" element={<ManageCartsPage />} />
        <Route path="loai-san-pham" element={<ManageCategoriesPage />} />
      </Route>
      <Route path="dat-lai-mat-khau" element={<ResetPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AdminRoutes;
