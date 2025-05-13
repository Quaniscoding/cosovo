import { Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
import OrderSummary from "./OrderSummary";
import ReusableButton from "../../../components/ui/Button";
export default function FormUser({
  form,
  handleFinishStep0,
  cartItems,
  totalAmount,
  loadingQr,
}) {
  const navigate = useNavigate();
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinishStep0}
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
          label="Email"
          name="customer_email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input placeholder="Email khách hàng" allowClear autoComplete="on" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="customer_phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            {
              pattern: /^\d{10}$/,
              message: "Số điện thoại phải gồm đúng 10 chữ số",
            },
          ]}
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
        <Form.Item label="Ghi chú" name="customer_note">
          <Input.TextArea rows={3} placeholder="Ghi chú" allowClear />
        </Form.Item>
        <div className="w-full flex gap-4">
          <Form.Item>
            <ReusableButton
              type="default"
              variant="secondary"
              onClick={() => navigate(-1)}
              className="w-full"
            >
              Quay lại
            </ReusableButton>
          </Form.Item>
          <Form.Item>
            <ReusableButton
              type="default"
              variant="primary"
              htmlType="submit"
              className="w-full"
              loading={loadingQr}
            >
              Tiếp tục
            </ReusableButton>
          </Form.Item>
        </div>
      </div>
      <OrderSummary cartItems={cartItems} totalAmount={totalAmount} />
    </Form>
  );
}
