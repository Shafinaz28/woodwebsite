import { createContext, useContext, useMemo, useState } from "react";
import { discountFromCoupon, findCoupon } from "../lib/coupons";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState(null);

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
    setCoupon(null);
  }

  function applyCoupon(code) {
    const found = findCoupon(code);
    if (!found) {
      throw new Error("Invalid or inactive coupon code");
    }
    setCoupon(found);
    return found;
  }

  function removeCoupon() {
    setCoupon(null);
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = useMemo(
    () => discountFromCoupon(cartTotal, coupon),
    [cartTotal, coupon]
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
        coupon,
        applyCoupon,
        removeCoupon,
        discount,
        payableTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
