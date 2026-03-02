import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import { cartContext } from "../Context/CartContext";
import { washListContext } from "../Context/WashlistContext";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Loader from "../Loader/Loader";

export default function ProductCategory({ category }) {
  const { addToCart } = useContext(cartContext);
  const { addToWashlist } = useContext(washListContext);

  const fetchCategoryProducts = () =>
    axios
      .get(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.data); // مهم: ناخد data فقط

  const { data, isLoading, error } = useQuery({
    queryKey: ["ProductCategorySwiper", category],
    queryFn: fetchCategoryProducts,
    refetchOnMount: false,
    retry: 2,
    enabled: !!category,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    toast.error(error.message, { position: "top-right", autoClose: 1500 });
    return null;
  }

  if (!data || !data.products || data.products.length === 0) return null;

  return (
    <div className="mt-22">
      <h2 className="text-xl font-semibold mb-4 text-[#076b5e]">
        More products in "{category}"
      </h2>

      <Swiper
        spaceBetween={15}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {data.products.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              to={`/productDetails/${item.id}`}
              className="block bg-white/90 rounded-lg p-4"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-40 object-contain mb-2"
              />
              <p className="font-semibold text-[#076b5e] text-sm">
                {item.title}
              </p>
              <p className="text-gray-500 text-sm mt-1.5">${item.price}</p>

              <div className="flex items-center gap-4 text-gray-400 text-md mt-3">
                <FaHeart
                  onClick={() => addToWashlist(item)}
                  className="cursor-pointer hover:text-red-500 transition"
                />
                <FaCartShopping
                  onClick={() => addToCart(item)}
                  className="cursor-pointer hover:text-green-600 transition"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
