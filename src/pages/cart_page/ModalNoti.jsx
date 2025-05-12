import { Modal, Typography, Divider, Row, Col, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

export default function ModalNoti({
  showModal,
  handleModalOk,
  outOfStockList,
}) {
  return (
    <Modal
      open={showModal}
      onOk={handleModalOk}
      onCancel={handleModalOk}
      footer={null}
      width="50vw"
      style={{ top: 20 }}
      centered
      closable={false}
      className="rounded-2xl"
    >
      <Row justify="center" align="middle" gutter={[16, 16]}>
        <Col span={24} className="!flex !justify-center">
          <ExclamationCircleOutlined
            style={{ fontSize: "3rem", color: "#faad14" }}
          />
        </Col>
        <Col span={24} className="text-center">
          <Title level={3}>Thông báo sản phẩm</Title>
          <Text type="danger" strong>
            Các sản phẩm sau đã hết hàng hoặc không còn tồn tại và sẽ bị xóa
            khỏi giỏ hàng:
          </Text>
        </Col>
        <Col span={24}>
          <ul className="list-disc ml-8 mt-4 space-y-2">
            {outOfStockList.map((item) => (
              <li
                key={item.variant_id}
                className="flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <Text strong>{item.name}</Text>
                  <Text>
                    {" "}
                    {item.size && ` - ${item.size}`}
                    {item.color && ` - ${item.color}`}
                  </Text>
                </div>
                <Text type="secondary">
                  Số lượng trong kho: {item.max_quantity}
                </Text>
              </li>
            ))}
          </ul>
        </Col>
        <Col span={24} className="!flex !justify-center mt-8">
          <Button
            type="default"
            variant="outline"
            color="gold"
            size="large"
            onClick={handleModalOk}
            className="rounded-xl px-6"
          >
            Đã hiểu
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}
