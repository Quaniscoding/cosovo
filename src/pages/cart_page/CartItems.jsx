import { Button, Select } from "antd";
import { X } from "lucide-react";
import React from "react";

export default function CartItems({
  cartItems,
  updateQuantity,
  removeFromCart,
  total,
}) {
  return (
    <div className="lg:col-span-2 flex flex-col gap-6 sm:max-h-[calc(100vh-200px)] sm:overflow-y-auto hide-scrollbar">
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="relative flex items-center justify-between sm:gap-4 py-3 sm:py-0 sm:p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
        >
          {/* Product Image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-40 h-40 sm:w-60 sm:h-60 object-contain rounded-lg"
          />

          <article className="w-full flex flex-col md:grid md:grid-cols-2 gap-6">
            {/* Thông tin sản phẩm */}
            <div className="flex flex-col justify-start">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 break-words">
                {item.name}
              </h2>
              <p className="mt-2 text-sm md:text-base text-gray-600">
                <span className="font-medium text-gray-800">Màu sắc:</span>{" "}
                {item.color}
              </p>
              <p className="text-sm md:text-base text-gray-600">
                <span className="font-medium text-gray-800">Kích thước:</span>{" "}
                {item.size}
              </p>
              <p className="mt-3 text-lg md:text-xl font-semibold text-gray-900">
                {item.price.toLocaleString()} VND
              </p>
            </div>

            {/* Selector & Tổng tiền */}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label
                  htmlFor={`quantity-${index}`}
                  className="text-sm md:text-base font-semibold text-gray-600"
                >
                  Số lượng
                </label>
                <Select
                  id={`quantity-${index}`}
                  value={item.quantity}
                  onChange={(value) => updateQuantity(index, value)}
                  className="w-full sm:w-24 md:w-32 !text-sm md:!text-base"
                  aria-label="Chọn số lượng"
                  disabled={item.quantity >= 10}
                  size="large"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <Select.Option key={i + 1} value={i + 1}>
                      {i + 1}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="mt-4 flex justify-between items-baseline">
                <span className="uppercase text-sm sm:text-base text-gray-600">
                  Tổng:{" "}
                </span>
                <span className="text-sm sm:text-base font-semibold text-gray-900 block">
                  {total.toLocaleString()} VND
                </span>
              </div>
            </div>
          </article>

          {/* Remove Button */}
          <Button
            type="text"
            icon={<X size={20} />}
            onClick={() => removeFromCart(index)}
            className="absolute top-[-110px] sm:top-[-90px] right-0 text-gray-500 hover:text-gray-800"
            aria-label={`Remove ${item.name} from cart`}
          />
        </div>
      ))}
    </div>
  );
}
