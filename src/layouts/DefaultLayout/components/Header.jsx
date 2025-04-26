import { Search, ShoppingCart, ArrowLeft } from "lucide-react";
import { Input, Tooltip } from "antd";
import { useState } from "react";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchValue);
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
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
        <div
          className={`flex-1 flex justify-center transition-all duration-300 ease-in-out ${
            searchOpen ? "ml-0" : "ml-4"
          }`}
        >
          {searchOpen ? (
            <Input
              placeholder="Tìm gian hàng hoặc sản phẩm"
              suffix={
                <Search
                  size={18}
                  className="text-gray-500"
                  onClick={handleSearch}
                />
              }
              className="rounded-full border-gray-300 focus:border-black focus:ring-0 w-full"
              size="large"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          ) : (
            <div className="hidden md:flex w-full max-w-md">
              <Input
                placeholder="Tìm gian hàng hoặc sản phẩm"
                suffix={<Search size={18} className="text-gray-500" />}
                className="rounded-full border-gray-300 focus:border-black focus:ring-0 w-full"
                size="large"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          )}
        </div>

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
            <a href="/gio-hang" className="relative cursor-pointer">
              <Tooltip title="Giỏ hàng" placement="bottom">
                <ShoppingCart size={24} className="text-gray-800" />
              </Tooltip>
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
