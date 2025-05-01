/* eslint-disable no-unused-vars */
import { Divider, Typography } from "antd";
import React from "react";
import ReusableButton from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

export default function OrderSummary({
  cartItems,
  total,
  finalTotal,
  discountCode,
  setDiscountCode,
}) {
  const navigate = useNavigate();
  return (
    <div className="lg:col-span-1 h-full">
      <div className="flex flex-col gap-4 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
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
        <ReusableButton
          onClick={() => {
            navigate("/thanh-toan");
          }}
        >
          Thanh toán
        </ReusableButton>

        <ReusableButton variant="secondary">
          <a href="/">Tiếp tục mua sắm</a>
        </ReusableButton>
        <Text className="text-xs sm:text-sm text-gray-500 mt-4 block text-center">
          Miễn phí vận chuyển áp dụng cho đơn hàng từ 500,000VND và tất cả các
          đơn nhận tại cửa hàng. (Click & Collect).
        </Text>
      </div>
    </div>
  );
}
