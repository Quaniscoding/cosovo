import React, { useState, useEffect } from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import Loading from "../../components/Loading";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        const mergedCart = mergeDuplicateItems(parsedCart);
        setCartItems(mergedCart);
        localStorage.setItem("cart", JSON.stringify(mergedCart));
      }
    };

    // Giả lập loading 1s
    setLoading(true);
    setTimeout(() => {
      fetchCart();
      setLoading(false);
    }, 1000);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const mergeDuplicateItems = (items) => {
    const merged = [];

    for (const item of items) {
      const key = `${item.id}-${item.color}-${item.size}`;
      const existingIndex = merged.findIndex(
        (i) => `${i.id}-${i.color}-${i.size}` === key
      );

      if (existingIndex !== -1) {
        merged[existingIndex].quantity += item.quantity;
      } else {
        merged.push({ ...item });
      }
    }

    return merged;
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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

  if (loading) {
    return <Loading loading={loading} />;
  }

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
          />
        </div>
      )}
    </div>
  );
}
