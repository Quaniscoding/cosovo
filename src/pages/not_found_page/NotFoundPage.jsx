import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang này không tìm thấy."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Quay lại trang chủ
          </Button>
        }
      />
    </div>
  );
}
