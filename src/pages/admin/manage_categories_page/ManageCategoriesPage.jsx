import React from "react";
import { useCategories } from "../../../hooks/useCategories";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

export default function ManageCategoriesPage() {
  const navigate = useNavigate();
  const { categories, loading, error } = useCategories();
  // if (error) navigate("/loi");
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Hành động",
    //   key: "action",
    //   render: (_, record) => (
    //     <span>
    //       <a>Chỉnh sửa</a>
    //       <a style={{ marginLeft: 16 }}>Xóa</a>
    //     </span>
    //   ),
    // },
  ];
  return <Table columns={columns} dataSource={categories} loading={loading} />;
}
