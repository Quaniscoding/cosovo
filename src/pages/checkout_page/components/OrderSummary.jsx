import { Button, Card, List, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const OrderSummary = ({ cartItems, totalAmount }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(cart, idx) => (
          <List.Item key={cart.variant_id || idx}>
            <Card className="w-full gap-4">
              <div className="flex justify-between items-center mb-4">
                <Title level={4}>Thông tin đơn hàng</Title>

                <Button
                  type="dashed"
                  onClick={() => navigate("/gio-hang")}
                  className="cursor-pointer"
                >
                  Chỉnh sửa
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={cart.image}
                  alt={cart.name}
                  className="w-full sm:w-[80px] !h-auto object-cover"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <Title level={5}>{cart.name}</Title>
                  <Text>Giá: {cart.price?.toLocaleString()} VND</Text>
                  <Text>Màu: {cart.color}</Text>
                  {!cart.isElectronics && <Text>Size: {cart.size}</Text>}
                  <Text>Số lượng: {cart.quantity}</Text>
                </div>
              </div>
              <div className="text-right pr-4">
                <Title level={4} className="!font-semibold">
                  Tổng: {(cart.price * cart.quantity)?.toLocaleString()} VND
                </Title>
              </div>
            </Card>
          </List.Item>
        )}
      />
      <Title level={3} className="!font-semibold !text-end">
        Tổng: {totalAmount?.toLocaleString()} VND
      </Title>
    </div>
  );
};

export default OrderSummary;
