import React from "react";
import { Button, Result } from "antd";
import ReusableButton from "../../components/ui/Button";
const ErrorPage = () => (
  <Result
    status="500"
    title="500"
    subTitle="Xin lỗi, đã xảy ra lỗi máy chủ."
    extra={
      <ReusableButton className="!w-52" variant="primary">
        <a href="/" className="!text-white">
          {" "}
          Quay lại trang chủ
        </a>
      </ReusableButton>
    }
  />
);
export default ErrorPage;
