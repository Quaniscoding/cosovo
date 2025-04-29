import React, { useState, useEffect } from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import Loading from "../../components/Loading";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  // Load cart from localStorage and merge duplicates on component mount
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

    // Giả lập loading 3s
    setTimeout(() => {
      fetchCart();
      setLoading(true);
      let ptg = -10;

      const interval = setInterval(() => {
        ptg += 10;
        setPercent(ptg);

        if (ptg > 120) {
          clearInterval(interval);
          setLoading(false);
          setPercent(0);
        }
      }, 50);
    }, 1000);
  }, []);

  // Function to merge duplicate items based on id, color, and size
  const mergeDuplicateItems = (items) => {
    const merged = [];
    items.forEach((item) => {
      const existingItem = merged.find(
        (i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        merged.push({ ...item });
      }
    });
    return merged;
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Update quantity of an item
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const total = calculateTotal();
  const shippingFee = 0;
  const finalTotal = total + shippingFee;
  if (loading) {
    return <Loading percent={percent} loading={loading} />;
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
        <Text className="text-center text-gray-500 text-sm sm:text-base">
          Giỏ hàng của bạn đang trống.
        </Text>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <CartItems
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            total={total}
          />

          {/* Order Summary */}
          <OrderSummary
            cartItems={cartItems}
            total={total}
            finalTotal={finalTotal}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
          />
        </div>
      )}
    </div>
  );
}
