import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  discountFromCoupon,
  validateCoupon,
} from "../lib/coupons";

const CartContext = createContext();
const COUPON_SESSION_KEY = "arileon_coupon_code";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");

  function addToCart(product, quantity = 1) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity,
        },
      ];
    });
  }

  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }

  function clearCart() {
    setCart([]);
    setAppliedCoupon(null);
    setCouponMessage("");
    sessionStorage.removeItem(COUPON_SESSION_KEY);
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const saved = sessionStorage.getItem(COUPON_SESSION_KEY);
    if (!saved) {
      setAppliedCoupon(null);
      return;
    }
    const result = validateCoupon(saved, cartTotal);
    if (result.ok) {
      setAppliedCoupon(result.coupon);
      setCouponMessage("");
    } else {
      setAppliedCoupon(null);
      if (cart.length > 0) setCouponMessage(result.error);
      sessionStorage.removeItem(COUPON_SESSION_KEY);
    }
  }, [cartTotal, cart.length]);

  function applyCoupon(code) {
    const result = validateCoupon(code, cartTotal);
    if (!result.ok) {
      setCouponMessage(result.error);
      return result;
    }
    setAppliedCoupon(result.coupon);
    setCouponMessage(`${result.coupon.code} applied — ${result.coupon.percent}% off`);
    sessionStorage.setItem(COUPON_SESSION_KEY, result.coupon.code);
    return result;
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponMessage("");
    sessionStorage.removeItem(COUPON_SESSION_KEY);
  }

  const discount = useMemo(
    () => discountFromCoupon(cartTotal, appliedCoupon),
    [cartTotal, appliedCoupon]
  );

  const payableTotal = Math.max(0, cartTotal - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        discount,
        payableTotal,
        appliedCoupon,
        couponMessage,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
