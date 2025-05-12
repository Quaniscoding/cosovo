import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrdersTable from "./components/OrdersTable";
import { useOrders } from "../../../hooks/useOrders";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import { useCategories } from "../../../hooks/useCategories";
import {
  adminCreateOrder,
  deleteOrder,
  updatePrepareOrder,
} from "../../../services/OrderServices";
import { Button } from "antd";
import CreateOrderModal from "./modal/CreateOrderModal";
import { useProducts } from "../../../hooks/useProducts";

export default function ManageOrdersPage() {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    page: 1,
    size: 10,
  });
  const { orders, loading, error, refetch } = useOrders(payload);
  const [payloadProducts, setPayloadProducts] = useState({
    page: 1,
    size: 10,
    search: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const { products } = useProducts(payloadProducts);
  const [formResetKey, setFormResetKey] = useState(0);
  const { categories } = useCategories();
  if (loading && !orders) return <Loading loading />;
  // if (error) navigate("/loi");

  const getSelectedItems = () => {
    return {
      Items: Object.entries(selectedQuantities)
        // eslint-disable-next-line no-unused-vars
        .filter(([variantId, quantity]) => quantity > 0)
        .map(([variantId, quantity]) => ({
          variant_id: variantId,
          quantity,
        })),
    };
  };
  const handleRemoveVariant = (variantId) => {
    setSelectedQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[variantId];
      return newQuantities;
    });
  };
  const handleCreateOrder = async (values) => {
    try {
      if (getSelectedItems().Items.length === 0) {
        toast.error("Vui lòng chọn sản phẩm và mẫu mã");
        return;
      }
      const res = await adminCreateOrder({
        ...values,
        status: "admin",
        ...getSelectedItems(),
      });
      if (res.status === 201) {
        toast.success("Tạo đơn hàng thành công!");
        refetch();
        setIsModalOpen(false);
        setSelectedQuantities({});
        setPayloadProducts({ ...payloadProducts, search: "" });
        setFormResetKey((k) => k + 1);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleQuantityChange = (variantId, quantity) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [variantId]: quantity,
    }));
  };
  const handleDeleteOrder = async (orderId) => {
    try {
      const res = await deleteOrder(orderId);
      if (res.status === 200) {
        toast.success("Xóa đơn hàng thành công!");
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handlePrepareOrder = async (orderId) => {
    try {
      const res = await updatePrepareOrder(orderId);
      if (res.status === 200) {
        toast.success("Cập nhật chuẩn bị hàng thành công!");
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="p-4">
      <Button
        color="default"
        variant="solid"
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: 16 }}
      >
        Tạo đơn hàng
      </Button>
      <OrdersTable
        orders={orders}
        payload={payload}
        setPayload={setPayload}
        categories={categories}
        handleDeleteOrder={handleDeleteOrder}
        handlePrepareOrder={handlePrepareOrder}
      />
      <CreateOrderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onOk={handleCreateOrder}
        products={products}
        payloadProducts={payloadProducts}
        setPayloadProducts={setPayloadProducts}
        selectedQuantities={selectedQuantities}
        handleQuantityChange={handleQuantityChange}
        handleRemoveVariant={handleRemoveVariant}
        formResetKey={formResetKey}
      />
    </div>
  );
}
