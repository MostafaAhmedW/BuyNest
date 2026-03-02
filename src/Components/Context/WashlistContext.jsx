import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const washListContext = createContext();

export default function WashlistContextProvider({ children }) {
  const [washlistItem, setWashlistItem] = useState(() => {
    const savedWishList = localStorage.getItem("washlist");
    return savedWishList ? JSON.parse(savedWishList) : [];
  });

  useEffect(() => {
    localStorage.setItem("washlist", JSON.stringify(washlistItem));
  }, [washlistItem]);

  function addToWashlist(product) {
    // هل المنتج موجود بالفعل؟
    const exists = washlistItem.find((item) => item.id === product.id);

    if (exists) {
      toast.success(" Product already in wishlist ", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    // إضافة المنتج
    const updatedWishlist = [...washlistItem, product];
    setWashlistItem(updatedWishlist);

    toast.success("Added to wishlist ❤️", {
      position: "top-right",
      autoClose: 1500,
    });
  }

  function removeFromWishlist(id) {
    const updatedWishlist = washlistItem.filter((item) => item.id !== id);
    setWashlistItem(updatedWishlist);

    toast.error("Removed from wishlist", {
      position: "top-right",
      autoClose: 1500,
    });
  }

  function toggleWishlist(product) {
    const exists = washlistItem.find((item) => item.id === product.id);

    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWashlist(product);
    }
  }

  function clearWishlist() {
    setWashlistItem([]);
    toast.warn(" All products cleared from wishlist", {
      position: "top-right",
      autoClose: 1500,
    });
  }

  return (
    <washListContext.Provider
      value={{
        addToWashlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        washlistItem,
      }}
    >
      {children}
    </washListContext.Provider>
  );
}
