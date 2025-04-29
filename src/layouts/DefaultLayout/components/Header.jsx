/* eslint-disable no-empty-pattern */
import { Search, ShoppingCart, ArrowLeft } from "lucide-react";
import { Badge, Tooltip } from "antd";
import { useContext, useState } from "react";
import { CartContext } from "../../../contexts/CartContext";
import InputSearch from "./InputSearch";
import { useProducts } from "../../../hooks/useProducts";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [payload, setPayload] = useState({
    search: "",
  });
  const {} = useProducts(payload);

  const handleSearch = (e) => {
    e.preventDefault();
  };
  const { cartItems } = useContext(CartContext);
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16 relative">
        {/* Left */}
        <div className="flex items-center w-auto">
          {searchOpen ? (
            <button onClick={() => setSearchOpen(false)} className="mr-2">
              <ArrowLeft size={24} className="text-gray-800" />
            </button>
          ) : (
            <a href="/" className="text-2xl font-bold text-gray-800">
              COSOVO
            </a>
          )}
        </div>

        {/* Center */}
        <InputSearch
          searchOpen={searchOpen}
          payload={payload}
          setPayload={setPayload}
          handleSearch={handleSearch}
        />

        {/* Right */}
        {!searchOpen && (
          <div className="flex items-center ml-auto space-x-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="block md:hidden"
            >
              <Tooltip title="Tìm kiếm" placement="bottom">
                <Search size={24} className="text-gray-800" />
              </Tooltip>
            </button>
            <Badge count={cartItems.reduce((sum, i) => sum + i.quantity, 0)}>
              <a href="/gio-hang" className="relative cursor-pointer">
                <Tooltip title="Giỏ hàng" placement="bottom">
                  <ShoppingCart size={24} className="text-gray-800" />
                </Tooltip>
              </a>
            </Badge>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
