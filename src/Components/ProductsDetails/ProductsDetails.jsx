import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import { FaShoppingCart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// CSS
import "swiper/css";
import "swiper/css/pagination";
import { useContext } from "react";
import { cartContext } from "../Context/CartContext";
import { toast } from "react-toastify";
import { washListContext } from "../Context/WashlistContext";
import { FaHeart } from "react-icons/fa6";
import ProductCategory from "../ProductCategory/ProductCategory";
import Loader from "../Loader/Loader";

export default function ProductsDetails() {
  const { addToCart } = useContext(cartContext);
  const { addToWashlist } = useContext(washListContext);

  const { id } = useParams();

  function getProductsDetails() {
    return axios.get(`https://dummyjson.com/products/${id}`);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: getProductsDetails,
    refetchOnMount: false,
    retry: 2,
  });

  const product = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return toast.error(error.message, {
      position: "top-right",
      autoClose: 1500,
    });
  }

  return (
    <>
      <div className="  mt-30 container mx-auto px-4 min-h-screen">
        {/* Card */}
        <div className="  bg-white/95 border border-[#076b5e] rounded-2xl p-4 sm:p-6 grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Images */}
          <div className="rounded-xl overflow-hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 2700,
                disableOnInteraction: false,
              }}
              className="h-64 md:h-96 "
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={product.title}
                    className="w-full h-56 md:h-80 object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right Side - Info */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Title */}
              <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl mb-2 font-semibold text-[#076b5e]">
                  {product.title}
                </h1>

                <div className="text-2xl">
                  <Link
                    to="/"
                    className="focus:text-red-500 hover:text-red-500 text-[#017d6d] duration-200 ease-in"
                  >
                    {" "}
                    <TfiClose />{" "}
                  </Link>
                </div>
              </div>

              {/* Brand & Category */}
              <p className="mt-2 flex flex-wrap gap-2">
                {/* brand */}
                {product.brand && (
                  <span className="text-orange-500 px-3 rounded-full bg-orange-50 dark:bg-orange-500 dark:text-white border border-[#076b5e5f]">
                    {product.brand}
                  </span>
                )}

                {/*category */}
                {product.category && (
                  <span className="text-orange-600 px-3 rounded-full bg-orange-50 dark:bg-orange-500 dark:text-white border border-[#076b5e5f]">
                    {product.category}
                  </span>
                )}
              </p>

              {/* Rating */}
              <p className="mt-2 text-yellow-400 font-semibold flex items-center gap-1">
                {Array.from({ length: Math.floor(product.rating) }).map(
                  (_, i) => (
                    <span key={i} className="text-lg">
                      <IoMdStar />
                    </span>
                  ),
                )}
                <span className="text-gray-600 ml-2">
                  {product.rating.toFixed(1)}
                </span>
              </p>

              {/* Price */}
              <div className="mt-4 flex items-center gap-3">
                <p className="text-lg md:text-xl text-[#017f6e] font-semibold">
                  ${product.price}
                </p>
                <p className="text-md md:text-md text-red-500">
                  {product.discountPercentage}% OFF
                </p>
              </div>

              {/* Stock */}
              <p className="mt-2 text-lg font-semibold text-[#017f6e]">
                Stock:{" "}
                <span className="font-normal text-black/65">
                  {" "}
                  {product.stock}{" "}
                </span>
              </p>

              {/* Description */}
              <p className="mt-4 text-lg leading-relaxed font-normal text-black/65">
                {product.description}
              </p>

              <div
                className=" mt-4  w-fit"
                onClick={() => addToWashlist(product)}
              >
                <FaHeart className="text-gray-400 text-lg  cursor-pointer hover:text-red-500 transition" />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center cursor-pointer gap-2 bg-[#076b5e] text-white py-3 rounded-xl font-semibold hover:bg-[#045c50] transition shadow-md"
              >
                Add to Cart
                <FaShoppingCart />
              </button>
            </div>
          </div>
        </div>

        <ProductCategory category={product.category} />
      </div>
    </>
  );
}
