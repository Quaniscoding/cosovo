import { useEffect, useState, useContext, useCallback, useMemo } from "react";
import { Form, Typography, Steps, Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/OrderServices";
import { createQrCode } from "../../services/QrServices";
import FormUser from "./components/Form";
import Loading from "../../components/Loading";
import StepOne from "./components/StepOne";
import { CartContext } from "../../contexts/CartContext";
import { bankAccountConfig } from "../../components/constants/bankAccountConfig";
import { toast } from "react-toastify";

const { Title } = Typography;
const { Step } = Steps;

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [orderPayload, setOrderPayload] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [loadingQr, setLoadingQr] = useState(false);
  const navigate = useNavigate();

  // Parse localStorage data safely
  const parsedData = useMemo(() => {
    try {
      const saved = localStorage.getItem("checkoutForm");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (parsedData) {
      form.setFieldsValue(parsedData);
    }
  }, [form, parsedData]);

  const totalAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const dataBankAccount = useMemo(() => {
    if (!parsedData) return null;
    return {
      ...bankAccountConfig,
      addInfo: `${parsedData.customer_name || ""} ${
        parsedData.customer_phone || ""
      }`,
      amount: totalAmount.toString(),
    };
  }, [parsedData, totalAmount]);

  const handleFinishStep1 = useCallback(
    async (values) => {
      const items = cartItems.map((item) => ({
        variant_id: item.variant_id,
        quantity: item.quantity,
      }));
      const orderData = { ...values, items };
      setOrderPayload(orderData);
      setLoadingQr(true);

      try {
        if (!dataBankAccount)
          throw new Error("Thiếu thông tin tài khoản ngân hàng");
        const createQr = await createQrCode(dataBankAccount);
        if (createQr.status === 200) {
          setQrCode(createQr.data.data.qrDataURL);
          setCurrentStep(1);
        } else {
          toast.error(createQr.message);
        }
      } catch (error) {
        toast.error(error.message || "Tạo QR code thất bại");
      } finally {
        setLoadingQr(false);
      }
    },
    [cartItems, dataBankAccount]
  );

  const handleCreateOrder = useCallback(async () => {
    try {
      setLoading(true);
      const res = await createOrder({ ...orderPayload, status: "customer" });
      if (res.status === 201) {
        setCurrentStep(2);
        clearCart();
      }
    } catch {
      toast.error("Tạo đơn hàng thất bại");
      setCurrentStep(0);
    } finally {
      setLoading(false);
    }
  }, [orderPayload, clearCart]);

  if (loading) return <Loading loading={loading} />;

  if (!cartItems.length) {
    navigate("/");
    return null;
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
            handleFinishStep1={handleFinishStep1}
          />
        )}

        {currentStep === 2 && (
          <Result
            status="success"
            title="Đơn hàng đã được tạo thành công!"
            subTitle="Kiểm tra thông tin đơn hàng ở trong lịch sử mua hàng."
            extra={[
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
