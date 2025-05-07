import React, { useState, useContext } from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

export default function Cart() {
  const { cartItems, deleteFromCart, clearCart, updateCartItem } =
    useContext(CartContext);
  const [discountCode, setDiscountCode] = useState("");
  const navigate = useNavigate();

  const removeFromCart = (item) => {
    deleteFromCart(item);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
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
