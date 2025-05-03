import React from "react";
import { Result } from "antd";

const ErrorPage = () => (
  <div className="flex items-center justify-center h-screen">
    <Result
      status="500"
      title="500"
      subTitle="Xin lỗi, đã xảy ra lỗi máy chủ. Chúng tôi sẽ khắc phục ngay."
    />
  </div>
);

export default ErrorPage;
