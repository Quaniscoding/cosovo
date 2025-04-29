import { Layout, Menu } from "antd";
import { Box, LayoutDashboard, ShoppingCart } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar({ collapsed }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Mapping path -> key
  const pathToKey = {
    "/admin/tong-quan": "0",
    "/admin/san-pham": "1",
    "/admin/don-hang": "2",
    "/admin/loai-san-pham": "3",
  };

  // Lấy key từ URL hiện tại
  const selectedKey = pathToKey[location.pathname] || "0";

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="!bg-gray-800 !text-white"
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        className="!bg-gray-800 !text-white"
        items={[
          {
            key: "0",
            label: "Tổng quan",
            icon: <LayoutDashboard width={20} />,
            onClick: () => navigate("/admin/tong-quan"),
          },
          {
            key: "1",
            label: "Sản phẩm",
            icon: <Box width={20} />,
            onClick: () => navigate("/admin/san-pham"),
          },
          {
            key: "2",
            label: "Đơn hàng",
            icon: <ShoppingCart width={20} />,
            onClick: () => navigate("/admin/don-hang"),
          },
          {
            key: "3",
            label: "Loại sản phẩm",
            icon: <Box width={20} />,
            onClick: () => navigate("/admin/loai-san-pham"),
          },
        ]}
      />
    </Sider>
  );
}
