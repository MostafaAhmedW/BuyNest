import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //  ===============================
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product) {
    // نبحث هل المنتج موجود بالفعل
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      // لو موجود → نزود الكمية فقط
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
      toast.info("Quantity updated in cart", {
        position: "top-right",
        autoClose: 1500,
      });
    } else {
      // لو مش موجود → نضيفه للكارت بكمية = 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);

      toast.success("Product added to cart", {
        position: "top-right",
        // autoClose:1500
      });
    }
  }

  function removeFromCart(id) {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Product removed from cart", {
      position: "top-right",
      autoClose: 1500,
    });
  }

  function increaseQty(id) {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
    toast.info("Product quantity increased", {
      position: "top-right",
      autoClose: 1500,
    });
  }

  function decreaseQty(id) {
    const itemDectrment = cartItems.find((item) => item.id === id);

    setCartItems(
      cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0), // لو الكمية صفر يتحذف
    );

    if (itemDectrment.quantity === 1) {
      toast.success(" Product removed from cart", {
        position: "top-right",
        autoClose: 1500,
      });
    } else {
      toast.info(" Product quantity decreased ", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  }

  function clearCart() {
    setCartItems([]);
    toast.warn(" All products cleared from cart", {
      position: "top-right",
      autoClose: 1500,
    });
  }

  return (
    <cartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
