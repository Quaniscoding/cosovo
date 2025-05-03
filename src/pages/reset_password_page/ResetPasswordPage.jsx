import { Card, Form } from "antd";
import React, { useEffect, useState } from "react";
import InputField from "../../components/ui/Input";
import ReusableButton from "../../components/ui/Button";
import { resetPassword } from "../../services/AuthServices";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/dang-nhap");
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      const { old_password, new_password } = values;
      const result = await resetPassword({ old_password, new_password });
      if (result.status === 401) {
        toast.error(result.response.data.error);
        return;
      } else {
        toast.success(result.message || "Đặt lại mật khẩu thành công!");
        Cookies.remove("token");
        navigate("/dang-nhap");
      }
    } catch (error) {
      toast.error(error.message || "Đặt lại mật khẩu thất bại");
      console.error("Reset password error:", error);
    }
  };

  if (checkingAuth) {
    return <Loading tip="Đang kiểm tra..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Đặt lại mật khẩu
        </h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <InputField
            label="Mật khẩu cũ"
            name="old_password"
            placeholder="Nhập mật khẩu cũ"
            type="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
          />
          <InputField
            label="Mật khẩu mới"
            name="new_password"
            placeholder="Nhập mật khẩu mới"
            type="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message:
                  "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số!",
              },
            ]}
          />
          <InputField
            label="Xác nhận mật khẩu"
            name="confirm_password"
            placeholder="Nhập lại mật khẩu mới"
            type="password"
            dependencies={["new_password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          />
          <Form.Item className="mt-4">
            <ReusableButton
              type="primary"
              htmlType="submit"
              className="w-full !text-base"
            >
              Đổi lại mật khẩu
            </ReusableButton>
          </Form.Item>
        </Form>
        <a
          href="/admin"
          className="!text-black text-base font-semibold hover:!underline"
        >
          Quay lại trang admin
        </a>
      </Card>
    </div>
  );
}
