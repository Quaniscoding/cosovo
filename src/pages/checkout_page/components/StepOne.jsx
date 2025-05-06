import { useEffect, useRef, useState } from "react";
import { Button, Divider, Image, Typography } from "antd";
import ReusableButton from "../../../components/ui/Button";
const { Title, Text } = Typography;

export default function StepOne({
  qrCode,
  totalAmount,
  cartItems,
  setCurrentStep,
  handleCreateOrder,
  loading,
  handleFinishStep1,
}) {
  const [expired, setExpired] = useState(false);
  const timerRef = useRef();

  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    setExpired(false);
    timerRef.current = setTimeout(() => {
      setExpired(true);
    }, 60000);

    return () => clearTimeout(timerRef.current);
  }, [qrCode, handleFinishStep1, reloadCount]);

  const handleReload = () => {
    setExpired(false);
    setReloadCount((c) => c + 1);
    handleFinishStep1();
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-6 max-w-6xl">
      {/* Tổng thanh toán */}
      <span className="text-center text-xl sm:text-2xl mb-4">
        Tổng thanh toán:{" "}
      </span>
      <span className="font-semibold text-3xl sm:text-4xl mb-4">
        {totalAmount.toLocaleString()}₫
      </span>
      {/* QR + Thông tin ngân hàng */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* QR Code */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          <Title level={5} type="danger" className="text-center !font-bold">
            Yêu cầu khách kiểm tra đúng số tiền và đúng tên người nhận Tran Duc
            Hai
          </Title>
          <div className="relative flex flex-col items-center">
            <Image
              src={qrCode}
              alt="QR Code"
              className={`!w-52 md:!w-64 mb-4 transition-all duration-300 ${
                expired ? "opacity-40 blur-sm" : ""
              }`}
              preview={false}
            />
            {expired && (
              <>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="bg-opacity-80 text-red-600 font-semibold px-4 py-2 rounded">
                    QR đã hết hạn, vui lòng tải lại
                  </span>
                </div>
                <Button
                  type="primary"
                  size="small"
                  className="absolute bottom-2 right-2"
                  onClick={handleReload}
                >
                  Tải lại QR
                </Button>
              </>
            )}
          </div>
          <Text className="text-center text-sm text-gray-500">
            Quét mã bằng app ngân hàng hoặc VNPAY để thanh toán
          </Text>

          {/* Hướng dẫn */}
          <div className="mt-4 text-left text-sm w-full">
            <Title level={5}>Hướng dẫn thanh toán:</Title>
            <ol className="list-decimal list-inside space-y-1">
              <li>Mở ứng dụng ngân hàng hoặc VNPAY trên điện thoại</li>
              <li>Chọn chức năng quét mã QR</li>
              <li>Quét mã bên trái và thanh toán đúng số tiền</li>
              <li>Ghi đúng nội dung chuyển khoản để hệ thống xác nhận</li>
            </ol>
          </div>

          {/* Nút điều hướng */}
          <div className="flex gap-4 mt-6">
            <ReusableButton type="primary" onClick={() => setCurrentStep(0)}>
              Quay lại
            </ReusableButton>
            <ReusableButton
              type="secondary"
              onClick={handleCreateOrder}
              loading={loading}
            >
              Đã thanh toán
            </ReusableButton>
          </div>
        </div>

        {/* Thông tin chuyển khoản */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          <Title level={5} className="mb-4 text-center">
            Thông tin chuyển khoản
          </Title>
          <div className="space-y-2 text-sm md:text-base">
            <p>
              <strong>Ngân hàng:</strong> Vietcombank
            </p>
            <p>
              <strong>Tên tài khoản:</strong> TRAN DUC HAI
            </p>
            <p>
              <strong>Số tài khoản:</strong> 0291000155301
            </p>
            <p>
              <strong>Nội dung chuyển khoản:</strong> HOTEN + SĐT
            </p>
            <p>
              <strong>Số tiền:</strong> {totalAmount.toLocaleString()}₫
            </p>
          </div>

          <Divider />

          {/* Tóm tắt đơn hàng */}
          <Title level={5} className="mt-4 mb-2">
            Tóm tắt đơn hàng
          </Title>
          <ul className="text-sm space-y-1">
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} × {item.quantity} — {item.price.toLocaleString()}₫
              </li>
            ))}
          </ul>
          <div className="mt-2 font-semibold">
            Tổng cộng: {totalAmount.toLocaleString()}₫
          </div>
        </div>
      </div>
    </div>
  );
}
