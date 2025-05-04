import { Button, Image, InputNumber } from "antd";
import React from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function CartItems({
  cartItems,
  updateQuantity,
  removeFromCart,
}) {
  const navigate = useNavigate();
  return (
    <div className="w-full lg:col-span-2 flex flex-col gap-6 max-h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-row items-center justify-between gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300 "
        >
          {/* Product Image */}
          <Image
            src={item.image}
            alt={item.name}
            className="w-full sm:!w-48 md:!w-40 lg:!w-56 h-auto object-contain rounded-lg"
            width={100}
            height={100}
            preview={false}
          />

          <article className="w-full flex flex-col gap-6">
            {/* Product Info */}
            <div className="flex flex-col justify-start">
              <div className="flex justify-between items-center">
                <h2
                  className="text-lg sm:text-xl  font-semibold text-gray-900 break-words cursor-pointer hover:text-gray-600"
                  onClick={() => navigate(`/san-pham/${item.id}`)}
                >
                  {item.name}
                </h2>
                {/* Remove Button */}

                <Button
                  type="text"
                  icon={<Trash size={20} />}
                  aria-label={`Remove ${item.name} from cart`}
                  onClick={() => removeFromCart(index)}
                />
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                <span className="font-medium text-gray-800">Màu sắc:</span>{" "}
                {item.color}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                <span className="font-medium text-gray-800">Kích thước:</span>{" "}
                {item.size || "-"}
              </p>
              <div className="flex ww-full justify-between items-center">
                <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                  {item.price.toLocaleString()} VND
                </p>
                {/* Selector & Total */}
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        icon={<MinusOutlined />}
                        onClick={() =>
                          updateQuantity(index, Math.max(1, item.quantity - 1))
                        }
                        disabled={item.quantity <= 1}
                      />
                      <InputNumber
                        id={`quantity-${index}`}
                        min={1}
                        value={item.quantity}
                        onChange={(value) => updateQuantity(index, value)}
                        className="!text-xs sm:!text-sm md:!text-base !w-10 !text-center !border-none focus:!outline-none focus:!ring-0 focus:!shadow-none !px-0"
                        aria-label="Chọn số lượng"
                      />
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
