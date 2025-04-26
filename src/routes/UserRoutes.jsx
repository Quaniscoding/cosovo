import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout.jsx";
import HomePage from "../pages/home_page/HomePage.jsx";
import NotFoundPage from "../pages/not_found_page/NotFoundPage.jsx";
import Cart from "../pages/cart_page/Cart.jsx";

const UserRoutes = () => (
  <Routes>
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/gio-hang" element={<Cart />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default UserRoutes;
