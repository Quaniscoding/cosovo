import { Spin } from "antd";

export default function Loading({ loading, tip }) {
  return (
    <Spin size="large" fullscreen={true} spinning={loading}>
      {tip}
    </Spin>
  );
}
