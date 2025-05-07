import { Image, Select, Table, Tag } from "antd";
import moment from "moment";
import React from "react";
import ActionButtons from "./ActionButtons";
import {
  orderStatusOptions,
  preparedOptions,
} from "../../../../constants/status";

export default function OrdersTable({
  orders,
  payload,
  setPayload,
  handleDeleteOrder,
  handlePrepareOrder,
}) {
  // console.log(orders);

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
      key: ["variant", "product", "name"],
      width: 150,
      render: (product, record) => record.variant.product.name,
    },
    {
      title: "Màu sắc",
      dataIndex: ["variant", "color"],
      width: 100,
      render: (color) => (
        <span>
          {color === "def" ? "Mặc định" : color ? color : "Không tìm thấy"}
        </span>
      ),
    },
    {
      title: "Kích cỡ",
      dataIndex: ["variant", "size"],
      width: 100,
      render: (size) => {
        return (
          <span className="font-semibold">
            {size ? size : "Không tìm thấy"}
          </span>
        );
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
        <Image
          src={images?.[0]?.url || "/assets/images/noimg.png"}
          alt="product"
          className="!w-16 !h-16 object-cover rounded"
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
