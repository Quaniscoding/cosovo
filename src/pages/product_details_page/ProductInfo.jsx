import React from "react";
import { InputNumber, Typography, Divider, Modal } from "antd";
import ModalNotification from "./ModalNotification";
import ReusableButton from "../../components/ui/Button";

const { Title, Text } = Typography;

export default function ProductInfo({
  product,
  productDetails,
  setProductDetails,
  handleAddAndOpenModal,
  isModalOpen,
  handleContinueShopping,
  handleViewCart,
}) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-4">
      <Title
        level={2}
        className="text-xl sm:text-2xl md:text-3xl font-semibold"
      >
        {product.name}
      </Title>
      <Text type="secondary" className="text-sm sm:text-base">
        {product.description}
      </Text>

      <Divider className="my-2" />

      {/* Color Selection */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 sm:gap-3">
          {product.colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setProductDetails({ ...productDetails, color })}
              className={
                `w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transform transition-transform duration-200 cursor-pointer ` +
                (productDetails.color === color
                  ? "border-gray-600 scale-110"
                  : "border-gray-300 hover:scale-110")
              }
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
        <span className="text-sm sm:text-base text-gray-400">
          Color: {productDetails.color}
        </span>
      </div>

      {/* Size Selection */}
      {product.category === "clothing" && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setProductDetails({ ...productDetails, size })}
                className={
                  `w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-sm sm:text-base border-2 transform transition-transform duration-200 cursor-pointer ` +
                  (productDetails.size === size
                    ? "border-gray-600 scale-105"
                    : "border-gray-300 hover:scale-105")
                }
              >
                {size}
              </button>
            ))}
          </div>
          <span className="text-sm sm:text-base text-gray-400">
            Size: {productDetails.size}
          </span>
        </div>
      )}

      {/* Quantity Input */}
      <div className="flex items-center gap-4">
        <InputNumber
          min={1}
          defaultValue={1}
          value={productDetails.quantity}
          onChange={(value) =>
            setProductDetails({ ...productDetails, quantity: value })
          }
          className="w-20 sm:w-24 border-2 rounded-lg !text-xl font-semibold"
          size="large"
          aria-label="Select quantity"
        />
      </div>

      <Divider className="my-2" />

      {/* Price and Add to Cart */}
      <div className="flex flex-col items-start gap-4">
        <span className="text-lg sm:text-xl lg:text-2xl text-black font-bold">
          {product.price.toLocaleString()} VND
        </span>
        <ReusableButton onClick={handleAddAndOpenModal}>
          thêm vào giỏ hàng
        </ReusableButton>
        <ModalNotification
          isModalOpen={isModalOpen}
          handleContinueShopping={handleContinueShopping}
          handleViewCart={handleViewCart}
          productDetails={productDetails}
        />
      </div>
    </div>
  );
}
