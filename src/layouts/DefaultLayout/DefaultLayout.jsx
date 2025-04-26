import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;
