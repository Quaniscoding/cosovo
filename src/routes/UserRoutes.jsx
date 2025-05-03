import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout.jsx";
import HomePage from "../pages/home_page/HomePage.jsx";
import ProductDetails from "../pages/product_details_page/ProductDetails.jsx";
import NotFoundPage from "../pages/not_found_page/NotFoundPage.jsx";
import Cart from "../pages/cart_page/Cart.jsx";
import Checkout from "../pages/checkout_page/Checkout.jsx";
import LoginPage from "../pages/login_page/LoginPage.jsx";
import ErrorPage from "../pages/error_page/ErrorPage.jsx";

const UserRoutes = () => (
  <Routes>
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/san-pham/:id" element={<ProductDetails />} />
      <Route path="/gio-hang" element={<Cart />} />
    </Route>
    <Route path="/thanh-toan" element={<Checkout />} />
    <Route path="/dang-nhap" element={<LoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
    <Route path="/loi" element={<ErrorPage />} />
  </Routes>
);

export default UserRoutes;
