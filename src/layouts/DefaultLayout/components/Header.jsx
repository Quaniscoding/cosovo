import { ShoppingCart } from "lucide-react";
import { Badge, Tooltip } from "antd";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-gray-50 border-b border-gray-200"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16 relative">
        {/* Left */}
        <div className="flex items-center w-auto">
          <a href="/" className="flex items-center">
            <img
              src="/assets/images/logo.ico"
              alt="logo"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold text-black tracking-wide">
                COSOVO
              </span>
              <span className="text-[12px] text-gray-500 mt-[-7px]">
                www.cosovo.vn
              </span>
            </div>
          </a>
        </div>
        {/* Right */}
        <div className="flex items-center ml-auto space-x-4 gap-4">
          <Badge count={cartItems.reduce((sum, i) => sum + i.quantity, 0)}>
            <a href="/gio-hang" className="relative cursor-pointer">
              <Tooltip title="Giỏ hàng" placement="bottom">
                <ShoppingCart size={30} className="text-gray-800" />
              </Tooltip>
            </a>
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;
