import { Search } from "lucide-react";
import React from "react";

export default function InputSearch({
  searchOpen,
  payload,
  setPayload,
  handleSearch,
}) {
  return (
    <div
      className={`relative flex-1 flex justify-center transition-all duration-300 ease-in-out ${
        searchOpen ? "ml-0" : "mx-4"
      }`}
    >
      {searchOpen ? (
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Tìm gian hàng hoặc sản phẩm"
            value={payload.search}
            onChange={(e) => setPayload({ ...payload, search: e.target.value })}
            className="w-full py-3 px-4 rounded-full border border-gray-200 text-gray-700 focus:border-gray-400 focus:!outline-none  font-semibold"
          />
          <button
            onClick={handleSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <Search size={18} />
          </button>
        </div>
      ) : (
        <div className="hidden md:flex w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm gian hàng hoặc sản phẩm"
              value={payload.search}
              onChange={(e) =>
                setPayload({ ...payload, search: e.target.value })
              }
              className="w-full py-3 px-4 rounded-full border border-gray-200 text-gray-700 focus:border-gray-400 focus:!outline-none font-semibold"
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <Search
                size={18}
                className="cursor-pointer hover:text-gray-800"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
