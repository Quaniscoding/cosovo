import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { Layout, theme } from "antd";
import Sidebar from "./Components/Sidebar";
import HeaderAdmin from "./Components/Header";
const { Content } = Layout;
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout style={{ overflow: "auto" }}>
        <HeaderAdmin
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 64px)", // Adjust height to account for header
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
