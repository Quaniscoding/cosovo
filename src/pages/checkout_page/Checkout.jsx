import { useEffect, useState, useContext, useCallback, useMemo } from "react";
import { Typography, Steps, Button, Result, Form } from "antd";
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
  const [form] = Form.useForm();
  const { cartItems, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [qrCode, setQrCode] = useState(null);
  const [loadingQr, setLoadingQr] = useState(false);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
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
    return {
      ...bankAccountConfig,
      amount: totalAmount.toString(),
    };
  }, [totalAmount]);
  const handleCreateOrder = useCallback(
    async (values) => {
      const items = cartItems.map((item) => ({
        variant_id: item.variant_id,
        quantity: item.quantity,
      }));
      const orderData = { ...values, items };
      setLoadingQr(true);

      try {
        const resCreateOrder = await createOrder({
          ...orderData,
          created_by: "customer",
        });
        if (!dataBankAccount)
          throw new Error("Thiếu thông tin tài khoản ngân hàng");
        setOrderData(resCreateOrder.data.data);
        return resCreateOrder.data.data;
      } catch (error) {
        toast.error(error.message || "Tạo đơn hàng thất bại");
        throw error;
      } finally {
        setLoadingQr(false);
      }
    },
    [cartItems, dataBankAccount]
  );
  const handleCreateQrCode = useCallback(
    async (orderData) => {
      setLoadingQr(true);
      try {
        const createQr = await createQrCode({
          ...dataBankAccount,
          addInfo: orderData,
        });
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
    [dataBankAccount]
  );
  const handleFinishStep0 = useCallback(
    async (values) => {
      try {
        const orderData = await handleCreateOrder(values);
        await handleCreateQrCode(orderData);
      } catch (error) {
        toast.error(error.message || "Tạo QR code thất bại");
      } finally {
        setLoadingQr(false);
      }
    },
    [cartItems, dataBankAccount]
  );

  const handleFinishStep1 = useCallback(async () => {
    try {
      setCurrentStep(2);
      setLoading(true);
    } catch {
      toast.error("Tạo đơn hàng thất bại");
      setCurrentStep(0);
    } finally {
      setLoading(false);
    }
  }, [clearCart]);
  const handleBackHome = useCallback(() => {
    clearCart();
    navigate("/");
  });
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
            handleFinishStep0={handleFinishStep0}
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
            handleFinishStep1={handleFinishStep1}
            orderData={orderData}
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
                onClick={() => handleBackHome()}
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
