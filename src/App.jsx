import "../src/styles/App.css";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth.jsx";
import UserRoutes from "./routes/UserRoutes.jsx";
function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route element={<RequireAuth />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
