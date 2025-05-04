/* eslint-disable no-unused-vars */
import { Divider, Typography } from "antd";
import React from "react";
import ReusableButton from "../../components/ui/Button";
const { Text } = Typography;

export default function OrderSummary({
  cartItems,
  total,
  finalTotal,
  discountCode,
  setDiscountCode,
  handleCheckout,
}) {
  return (
    <div className="lg:col-span-1 h-full">
      <div className="flex flex-col gap-4 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <span className="text-base sm:text-xl font-semibold text-gray-900">
          TỔNG ĐƠN HÀNG | {cartItems.length} SẢN PHẨM
        </span>

        <div className="flex justify-between">
          <span className="text-sm sm:text-xl text-gray-700">Tổng cộng</span>
          <Text className="text-sm sm:text-base font-semibold text-gray-900">
            {total.toLocaleString()} VND
          </Text>
        </div>

        <Divider className="my-4 border-gray-300" />
        <ReusableButton onClick={handleCheckout}>Thanh toán</ReusableButton>

        <ReusableButton variant="secondary">
          <a href="/">Tiếp tục mua sắm</a>
        </ReusableButton>
      </div>
    </div>
  );
}
