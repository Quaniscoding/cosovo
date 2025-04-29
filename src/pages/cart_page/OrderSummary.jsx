/* eslint-disable no-unused-vars */
import { Button, Divider, Input, Typography } from "antd";
import React from "react";
import ReusableButton from "../../components/ui/Button";
const { Text } = Typography;

export default function OrderSummary({
  cartItems,
  total,
  finalTotal,
  discountCode,
  setDiscountCode,
}) {
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

        <div className="flex justify-between">
          <Text className="text-sm sm:text-base text-gray-700">
            Tổng đơn đặt hàng
          </Text>
          <Text className="text-sm sm:text-base font-semibold text-gray-900">
            {finalTotal.toLocaleString()} VND
          </Text>
        </div>

        <Divider className="my-4 border-gray-300" />

        {/* <div className="mb-4">
          <Text className="text-sm sm:text-base block mb-2 text-gray-700">
            Phiếu giảm giá
          </Text>
          <div className="flex gap-2">
            <Input
              placeholder="Nhập mã giảm giá"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1 rounded-lg border-gray-300"
              aria-label="Discount code input"
            />
            <Button className="rounded-lg text-white bg-gray-800 hover:bg-black">
              Áp dụng
            </Button>
          </div>
        </div> */}
        <ReusableButton> Thanh toán</ReusableButton>

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
