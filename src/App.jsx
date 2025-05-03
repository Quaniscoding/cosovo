import "../src/styles/App.css";
import "../src/styles/antdCss.css";

import AdminRoutes from "./routes/AdminRoutes.jsx";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth.jsx";
import UserRoutes from "./routes/UserRoutes.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route element={<RequireAuth />}>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
export default App;
