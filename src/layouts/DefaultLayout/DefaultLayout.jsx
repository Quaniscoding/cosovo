import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 px-2 bg-gray-100 mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
