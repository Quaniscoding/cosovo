import React, { useState, useContext, useMemo, useEffect } from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { useVariantDetails } from "../../hooks/useVariantDetails";
import Loading from "../../components/Loading";
import ModalNoti from "./ModalNoti";

export default function Cart() {
  const { cartItems, deleteFromCart, clearCart, updateCartItem } =
    useContext(CartContext);
  const [checkingStock, setCheckingStock] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [outOfStockList, setOutOfStockList] = useState([]);
  const variantIds = useMemo(
    () => cartItems.map((c) => c.variant_id),
    [cartItems]
  );

  const { variantDetails, loading } = useVariantDetails(variantIds);

  const variantMap = useMemo(() => {
    if (!Array.isArray(variantDetails)) return {};
    return variantDetails.reduce((acc, v) => {
      if (v && v.data && !v.error) {
        acc[v.data.id] = v.data;
      }
      return acc;
    }, {});
  }, [variantDetails]);

  useEffect(() => {
    if (loading) {
      setCheckingStock(true);
      return;
    }
    if (!Array.isArray(variantDetails) || variantDetails.length === 0) {
      setCheckingStock(false);
      return;
    }
    const outOfStockItems = [];
    cartItems.forEach((item) => {
      const variant = variantMap[item.variant_id];
      if (!variant || variant.stock === 0) {
        outOfStockItems.push(item);
      } else if (item.quantity > variant.stock) {
        updateCartItem(item, variant.stock);
      }
    });
    if (outOfStockItems.length > 0) {
      setOutOfStockList(outOfStockItems);
      setShowModal(true);
    }
    setCheckingStock(false);
  }, [loading, cartItems, variantMap, variantDetails]);

  const handleModalOk = () => {
    if (checkingStock || loading) return;
    outOfStockList.forEach((item) => deleteFromCart(item));
    setShowModal(false);
    setOutOfStockList([]);
  };

  const [discountCode, setDiscountCode] = useState("");
  const navigate = useNavigate();
  const removeFromCart = (item) => {
    deleteFromCart(item);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity < 1 || newQuantity > item.max_quantity) return;
    updateCartItem(item, newQuantity);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    navigate("/thanh-toan");
  };

  const total = calculateTotal();
  const shippingFee = 0;
  const finalTotal = total + shippingFee;

  if (checkingStock) return <Loading loading={true} />;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl text-gray-800 h-screen">
      <CustomBreadcrumb
        items={[
          {
            title: (
              <span className="text-xl font-semibold text-black uppercase">
                Giỏ hàng
              </span>
            ),
          },
        ]}
      />

      <ModalNoti
        showModal={showModal}
        handleModalOk={handleModalOk}
        outOfStockList={outOfStockList}
      />
      {cartItems.length === 0 ? (
        <span className="text-center text-gray-500 text-sm sm:text-base">
          Giỏ hàng của bạn đang trống.
        </span>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CartItems
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />

          {/* Order Summary */}
          <OrderSummary
            cartItems={cartItems}
            total={total}
            finalTotal={finalTotal}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            handleCheckout={handleCheckout}
            handleClearCart={handleClearCart}
          />
        </div>
      )}
    </div>
  );
}
