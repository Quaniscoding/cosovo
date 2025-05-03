import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 px-1 sm:px-0 bg-white mt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
