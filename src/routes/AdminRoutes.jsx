import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import NotFoundPage from "../pages/not_found_page/NotFoundPage";
import OverViewPage from "../pages/admin/overview_page/OverViewPage";
import ManageCategoriesPage from "../pages/admin/manage_categories_page/ManageCategoriesPage";
import ManageProductsPage from "../pages/admin/manage_products_page/ManageProductsPage";
import ResetPasswordPage from "../pages/reset_password_page/ResetPasswordPage";
import ManageOrdersPage from "../pages/admin/manage_orders_page/ManageOrdersPage";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<OverViewPage />} />
        <Route path="tong-quan" element={<OverViewPage />} />
        <Route path="san-pham" element={<ManageProductsPage />} />
        <Route path="don-hang" element={<ManageOrdersPage />} />
        <Route path="loai-san-pham" element={<ManageCategoriesPage />} />
      </Route>
      <Route path="dat-lai-mat-khau" element={<ResetPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AdminRoutes;
