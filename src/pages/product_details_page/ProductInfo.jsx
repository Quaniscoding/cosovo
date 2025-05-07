import React from "react";
import { InputNumber, Typography } from "antd";
import ModalNotification from "./ModalNotification";
import ReusableButton from "../../components/ui/Button";

const { Title, Text } = Typography;

function ProductInfo({
  product,
  productDetails,
  setProductDetails,
  handleAddAndOpenModal,
  isModalOpen,
  handleContinueShopping,
  handleViewCart,
  error,
  setError,
  setSelectedColor,
  colorToImagesMap,
  selectedColor,
}) {
  const variantsByColor = product.variants.filter(
    (v) => v.color === productDetails.color
  );
  const sizes = [...new Set(variantsByColor.map((v) => v.size))];

  const selectedVariant = product.variants.find(
    (v) => v.color === productDetails.color && v.size === productDetails.size
  );
  const stock = selectedVariant?.stock || productDetails?.stock;

  const onSizeSelect = (size) => {
    setProductDetails({ ...productDetails, size, quantity: 1 });
    setError(null);
  };

  const outOfStock = stock === 0;
  const overQuantity = productDetails.quantity > stock;
  const isDisabled = outOfStock || overQuantity;

  let buttonText = "Thêm vào giỏ hàng";
  if (outOfStock) buttonText = "Hết hàng";
  else if (overQuantity) buttonText = "Vượt quá tồn kho";

  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-6">
      <Title
        level={2}
        className="text-xl sm:text-2xl md:text-3xl font-semibold text-center !mb-0"
      >
        {product.name}
      </Title>
      <span className="text-base sm:text-lg lg:text-xl text-black font-bold text-center">
        {productDetails.price.toLocaleString()} VND
      </span>
      <Text type="secondary" className="text-sm sm:text-base">
        {product.description || "Không có mô tả"}
      </Text>

      {/* Color Selection */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 sm:gap-3">
          {Object.keys(colorToImagesMap).map((color) => (
            <button
              key={color}
              onClick={() => {
                setSelectedColor(color);
                setProductDetails((prev) => ({
                  ...prev,
                  color,
                  size: undefined,
                  quantity: 1,
                  image: colorToImagesMap[color][0],
                }));
              }}
              className={`w-8 h-8 flex items-center justify-center border rounded-full transition-all duration-300 cursor-pointer
      ${
        selectedColor === color
          ? "ring-2 ring-black scale-110 shadow-md border-black"
          : "bg-gray-100 text-gray-800"
      }`}
              style={{ backgroundColor: color }}
              title={color}
            ></button>
          ))}
        </div>
        <span className="text-sm sm:text-base text-gray-400">
          Màu: {selectedColor === "default" ? "Mặc định" : selectedColor}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeSelect(size)}
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-sm sm:text-base border-2 transform transition-transform duration-200 cursor-pointer ${
                productDetails.size === size
                  ? "border-gray-600 scale-105"
                  : "border-gray-300 hover:scale-105"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <span className="text-sm sm:text-base text-gray-400">
          Kích thước: {productDetails.size}
        </span>
      </div>
      {/* Quantity Input */}
      <div className="flex flex-col items-start gap-4">
        <InputNumber
          min={1}
          max={stock}
          value={productDetails.quantity}
          onChange={(value) =>
            setProductDetails({ ...productDetails, quantity: value })
          }
          className="w-20 sm:w-24 border-2 rounded-lg !text-xl font-semibold"
          size="large"
          aria-label="Select quantity"
          disabled={outOfStock}
        />
        <span className="text-sm text-gray-500">Có sẵn: {stock}</span>
      </div>

      {error && <span className="text-sm sm:text-base !h-1">{error}</span>}

      {/* Price and Add to Cart */}
      <div className="flex flex-col items-start gap-4">
        <ReusableButton onClick={handleAddAndOpenModal} disabled={isDisabled}>
          {buttonText}
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

export default ProductInfo;
