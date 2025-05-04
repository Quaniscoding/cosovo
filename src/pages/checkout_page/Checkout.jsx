import { useEffect, useState } from "react";
import { Form, Typography, Steps, Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/OrderServices";
import { createQrCode } from "../../services/QrServices";
import FormUser from "./components/Form";
import Loading from "../../components/Loading";
import StepOne from "./components/StepOne";

const { Title, Text } = Typography;
const { Step } = Steps;

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [orderPayload, setOrderPayload] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [loadingQr, setLoadingQr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cart");

    let cartData = [];

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        cartData = Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        console.error("Invalid cart JSON", e);
      }
    }

    setCartItems(cartData);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("checkoutForm");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.setFieldsValue(parsedData);
      } catch (err) {
        console.error("Invalid saved form data", err);
      }
    }
  }, [form]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const dataBankAccount = {
    accountNo: "0291000155301",
    accountName: "TRAN DUC HAI",
    acqId: "970436",
    addInfo: `CHUYEN TIEN ${cartItems[0]?.name}`,
    amount: totalAmount.toString(),
    template: "compact",
  };

  const handleFinishStep1 = async (values) => {
    const items = cartItems.map((item) => ({
      variant_id: item.variant_id,
      quantity: item.quantity,
    }));

    const orderData = { ...values, items };
    setOrderPayload(orderData);

    setLoadingQr(true);

    try {
      const createQr = await createQrCode(dataBankAccount);

      if (createQr.status === 200) {
        const qrCodeData = createQr.data.data.qrDataURL;
        setQrCode(qrCodeData);
        setCurrentStep(1);
      } else {
        console.error("Có lỗi khi tạo mã QR");
      }
    } catch (error) {
      console.error("QR error:", error);
      console.error("Đã xảy ra lỗi khi tạo mã QR");
    } finally {
      setLoadingQr(false);
    }
  };

  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      const res = await createOrder({ ...orderPayload, status: "customer" });
      if (res.status === 201) {
        setCurrentStep(2);
        localStorage.removeItem("cart");
        localStorage.removeItem("cart");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error creating order:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading loading={loading} />;

  if (!cartItems.length) {
    return navigate("/");
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl text-gray-800">
      <Title level={1} className="mb-6">
        Thanh toán
      </Title>

      {/* Steps horizontal */}
      <div className="overflow-x-auto mb-0 sm:mb-4">
        <Steps
          current={currentStep}
          responsive
          size="small"
          className="min-w-[300px] md:min-w-full"
        >
          <Step title="Thông tin khách hàng" />
          <Step title="Quét QR thanh toán" />
          <Step title="Xác nhận đơn hàng" />
        </Steps>
      </div>

      {/* Step content */}
      <div className="space-y-6">
        {currentStep === 0 && (
          <FormUser
            form={form}
            handleFinishStep1={handleFinishStep1}
            cartItems={cartItems}
            totalAmount={totalAmount}
            loadingQr={loadingQr}
            loading={loading}
          />
        )}

        {currentStep === 1 && (
          <StepOne
            qrCode={qrCode}
            totalAmount={totalAmount}
            cartItems={cartItems}
            setCurrentStep={setCurrentStep}
            handleCreateOrder={handleCreateOrder}
          />
        )}

        {currentStep === 2 && (
          <Result
            status="success"
            title="Đơn hàng đã được tạo thành công!"
            subTitle="Kiểm tra thông tin đơn hàng ở trong lịch sử mua hàng."
            extra={[
              // <Button
              //   key="history"
              //   onClick={() => navigate("/lich-su-mua-hang")}
              // >
              //   Lịch sử mua hàng
              // </Button>,
              <Button
                type="default"
                variant="solid"
                key="home"
                onClick={() => navigate("/")}
              >
                Về trang chủ
              </Button>,
            ]}
          />
        )}
      </div>
    </div>
  );
}
