import { Select, Table, Tag } from "antd";
import moment from "moment";
import React from "react";
import ActionButtons from "./ActionButtons";
import { colorTranslations } from "../../../../components/constants/color";
import {
  orderStatusOptions,
  preparedOptions,
} from "../../../../constants/status";

export default function OrdersTable({
  orders,
  payload,
  setPayload,
  categories,
  handleDeleteOrder,
  handlePrepareOrder,
}) {
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "customer_phone",
      key: "customer_phone",
    },
    {
      title: "Người tạo đơn",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (status) => (
        <span>{orderStatusOptions.find((o) => o.value === status)?.label}</span>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "totalAmount",
      width: 160,
      render: (price) => price.toLocaleString("vi-VN") + "₫",
    },
    {
      title: "Chuẩn bị",
      dataIndex: "prepared",
      key: "prepared",
      width: 160,
      render: (prepared, record) => (
        <Select
          value={prepared}
          style={{ width: 140 }}
          onChange={(value) => handlePrepareOrder(record.id, value)}
          options={preparedOptions}
        />
      ),
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "created_at",
      key: "orderDate",
      render: (text) => moment(text).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <ActionButtons
          record={record}
          onEdit={() => {}}
          onDelete={() => handleDeleteOrder(record.id)}
          onAddVariant={() => {}}
        />
      ),
    },
  ];
  const itemColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: ["variant", "product", "name"],
      key: "product_name",
      width: 150,
    },
    {
      title: "Màu sắc",
      dataIndex: ["variant", "color"],
      width: 100,
      render: (color) => <span>{colorTranslations[color] || color}</span>,
    },
    {
      title: "Kích cỡ",
      dataIndex: ["variant", "size"],
      width: 100,
      render: (size, record) => {
        const categoryName = categories
          ?.find((cat) => cat.id === record?.variant?.product?.category_id)
          ?.name?.toLowerCase();

        if (categoryName === "clothing") {
          return <span className="font-semibold">{size}</span>;
        } else {
          return <span className="italic">Không áp dụng</span>;
        }
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (price) => price.toLocaleString("vi-VN") + "₫",
    },
    {
      title: "Image",
      dataIndex: ["variant", "images"],
      key: "image",
      width: 100,
      render: (images) => (
        <img
          src={images?.[0]?.url}
          alt="product"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    // {
    //   title: "Hành động",
    //   key: "action",
    //   render: (_, record) => (
    //     <ActionButtons
    //       record={record}
    //       onEdit={() => {}}
    //       onDelete={() => {}}
    //       onAddVariant={() => {}}
    //     />
    //   ),
    // },
  ];
  return (
    <Table
      dataSource={orders?.items}
      rowKey="id"
      columns={columns}
      size="middle"
      expandable={{
        expandedRowRender: (record) => {
          return (
            <Table
              dataSource={record.order_items}
              rowKey={(item) => item.id}
              size="small"
              columns={itemColumns}
              pagination={false}
            />
          );
        },
      }}
      pagination={{
        total: orders?.total_items,
        pageSize: payload?.size,
        onChange: (page) => setPayload((prev) => ({ ...prev, page })),
      }}
      scroll={{ x: "max-content" }}
    />
  );
}
