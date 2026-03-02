import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { IoMdStar } from "react-icons/io";

import { DNA } from "react-loader-spinner";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { cartContext } from "../Context/CartContext";
import { washListContext } from "../Context/WashlistContext";

import imgHeader from "../../assets/Images/heroImg.webp";
import CategorySlider from "../CategorySlider/CategorySlider";
import Loader from "../Loader/Loader";

export default function Home() {
  const { addToCart } = useContext(cartContext);
  const { addToWashlist } = useContext(washListContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ["GetallProducts"],
    queryFn: getAllProducts,
    refetchOnMount: false,
    retry: 2,
  });

  function getAllProducts() {
    return axios.get("https://dummyjson.com/products");
  }

  useEffect(
    function () {
      if (error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    },
    [error],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* Hero section */}
<section className="bg-[#004f44] mt-16 py-12 relative headerImages">
  <div className="px-6 py-16 flex flex-col md:flex-row gap-10 items-center">
    
    {/* Text Section */}
    <div className="order-2 md:order-1 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
        Shop Smart. <span className="text-orange-500">Live Better.</span>
      </h1>

      <p className="mt-4 text-warning-soft/85 text-lg">
        Discover thousands of products at the best prices. Fast delivery,
        secure payment, and amazing deals every day.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Link to="/contact">
          <button className="bg-[#004f44] hover:text-[#004f44] hover:bg-white/90 duration-300 shadow-md border border-white/50 text-white px-6 py-3 rounded-lg cursor-pointer">
            Contact Us
          </button>
        </Link>
      </div>
    </div>

    {/* Image Section */}
    <div className="order-1 md:order-2 flex justify-center">
      <img
        src={imgHeader}
        className="w-full max-w-md md:max-w-lg rounded-b-3xl rounded-t-full shadow-md shadow-[#0b6459]"
      />
    </div>

  </div>
</section>

      <CategorySlider />

      {/* product cart */}
      <section className="">
        <div className=" bg-white p-5 mt-16 min-h-screen container mx-auto">
          <h1 className=" text-[#076b5e] font-bold text-3xl mb-10 relative">
            Products
            <div className="absolute bg-[#076b5e] dark:bg-orange-500 w-32 h-0.5 top-12 "></div>
          </h1>

          {/* Grid container */}
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {data?.data.products.map((product) => (
              <div
                key={product.id}
                className="bg-[#fffcfcf9] p-4 rounded-2xl shadow flex flex-col h-full border border-[#066356] dark:border-orange-500"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-52 object-center rounded mb-4 hover:scale-105 duration-300"
                  />
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
                    {product.discountPercentage}% OFF
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mt-2 text-[#017f6e]">
                    Title:{" "}
                    <span className="font-normal text-black/65 ">
                      {product.title}
                    </span>
                  </h3>

                  <div className="mt-4 flex items-center gap-3 text-[#017f6e]">
                    <p className="text-[#017f6e] font-semibold text-lg">
                      Price:{" "}
                      <span className="text-black/65 font-normal">
                        ${product.price}
                      </span>
                    </p>
                  </div>

                  <p className="font-semibold text-lg mt-1.5 text-[#017f6e]">
                    Category:{" "}
                    <span className="font-normal text-black/65">
                      {product.category}
                    </span>
                  </p>

                  <p className="font-semibold text-lg line-clamp-3 mt-1.5 text-[#017f6e]">
                    Description:{" "}
                    <span className="font-normal text-black/65">
                      {" "}
                      {product.description.split(".").slice(0, 3).join(".") +
                        (product.description.split(".").length > 3
                          ? "..."
                          : "")}
                    </span>
                  </p>

                  <p className="font-semibold text-lg mt-1.5 text-[#017f6e]">
                    Stock:{" "}
                    <span className="font-normal text-black/65">
                      {product.stock}
                    </span>
                  </p>

                  {/* Rating & Icons */}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                      {Array.from({ length: Math.floor(product.rating) }).map(
                        (_, i) => (
                          <IoMdStar key={i} className="text-lg" />
                        ),
                      )}
                      <span className="text-black/65 dark:text-orange-500 ml-2 text-sm">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-gray-400 text-lg">
                      <FaHeart
                        onClick={() => addToWashlist(product)}
                        className="cursor-pointer hover:text-red-500 transition"
                      />
                      <FaCartShopping
                        onClick={() => addToCart(product)}
                        className="cursor-pointer hover:text-green-600 transition"
                      />
                    </div>
                  </div>

                  {/* Button at bottom */}
                  <div className="mt-auto">
                    <Link to={`/productDetails/${product.id}`}>
                      <button
                        className="mt-6 bg-[#076b5e] hover:bg-[#045c50]  dark:bg-orange-500 w-full cursor-pointer relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-base 
                     dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      >
                        <span className="relative px-4 py-2.5 transition-all ease-in duration-75 rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
                          More details
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
