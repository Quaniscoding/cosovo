/* eslint-disable no-unused-vars */
import { Button, Popconfirm, Space } from "antd";

const ActionButtons = ({ record, onEdit, onDelete, onAddVariant }) => (
  <Space>
    {/* <Button size="small" onClick={onEdit} color="yellow">
      Sửa
    </Button> */}
    <Popconfirm title="Xóa sản phẩm?" onConfirm={onDelete}>
      <Button size="small" danger>
        Xóa
      </Button>
    </Popconfirm>
  </Space>
);

export default ActionButtons;
