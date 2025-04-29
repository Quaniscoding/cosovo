import { Button, Dropdown, Layout } from "antd";
import React from "react";
const { Header } = Layout;
import {
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function HeaderAdmin({
  collapsed,
  setCollapsed,
  colorBgContainer,
}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/dang-nhap");
  };
  const items = [
    {
      key: "1",
      label: <a href="/admin/dat-lai-mat-khau">Đặt lại mật khẩu</a>,
    },
    {
      key: "2",
      label: <a onClick={() => handleLogout()}>Đăng xuất</a>,
    },
  ];
  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="flex justify-between items-center"
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        arrow={{ pointAtCenter: true }}
      >
        <Button
          type="text"
          icon={<MenuOutlined />}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </Dropdown>
    </Header>
  );
}
