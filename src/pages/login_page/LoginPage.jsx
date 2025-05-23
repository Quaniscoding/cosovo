import React, { useEffect, useState } from "react";
import { Card, Form } from "antd";
import InputField from "../../components/ui/Input";
import ReusableButton from "../../components/ui/Button";
import { login } from "../../services/AuthServices";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

export default function LoginPage() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/admin");
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const result = await login(values);
      if (result.data.token) {
        toast.success(result.message || "Đăng nhập thành công!");
        Cookies.set("token", result.data.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
          path: "/",
        });
        navigate("/admin");
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
      if (result.status === 401) {
        toast.error(result.response.data.error);
        setLoading(false);

        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Đăng nhập thất bại");
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loading tip="Đang kiểm tra..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Đăng nhập quản trị
        </h2>
        <Form layout="vertical" onFinish={onFinish}>
          <InputField
            label="Email"
            name="email"
            placeholder="Nhập email"
            type="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          />
          <InputField
            label="Mật khẩu"
            name="password"
            placeholder="Nhập mật khẩu"
            type="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          />
          <Form.Item className="mt-4">
            <ReusableButton
              variant="primary"
              type="submit"
              className="w-full !text-base"
              loading={loading}
            >
              Đăng nhập
            </ReusableButton>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
