import React from "react";
import { Form, Input, Typography } from "antd";
const { Title, Text } = Typography;

import OrderSummary from "./OrderSummary";
import ReusableButton from "../../../components/ui/Button";
export default function FormUser({
  form,
  handleFinishStep1,
  cartItems,
  totalAmount,
  loadingQr,
}) {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinishStep1}
      onValuesChange={(_, allValues) => {
        localStorage.setItem("checkoutForm", JSON.stringify(allValues));
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div className="space-y-6">
        <Title level={4}>Thông tin khách hàng</Title>
        <Form.Item
          label="Tên khách hàng"
          name="customer_name"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input placeholder="Tên khách hàng" allowClear autoComplete="on" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="customer_phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="Số điện thoại" allowClear />
        </Form.Item>
        <Form.Item
          label="Địa chỉ giao hàng"
          name="customer_address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input.TextArea rows={3} placeholder="Địa chỉ" allowClear />
        </Form.Item>
        <Form.Item>
          <ReusableButton
            type="default"
            color="cyan"
            htmlType="submit"
            className="!w-1/2"
            loading={loadingQr}
          >
            Tiếp tục
          </ReusableButton>
        </Form.Item>
      </div>
      <OrderSummary cartItems={cartItems} totalAmount={totalAmount} />
    </Form>
  );
}
