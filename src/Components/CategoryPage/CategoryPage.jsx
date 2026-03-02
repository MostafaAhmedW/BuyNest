import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DNA } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { washListContext } from "../Context/WashlistContext";
import { cartContext } from "../Context/CartContext";
import { TfiClose } from "react-icons/tfi";
import { IoIosReturnLeft } from "react-icons/io";
import Loader from "../Loader/Loader";

export default function CategoryPage() {
  const { addToWashlist } = useContext(washListContext);
  const { addToCart } = useContext(cartContext);

  const { slug } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["GetCategoryList", slug],
    queryFn: getGategoryList,
    refetchOnMount: false,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  console.log(data?.data.products, " asdsadasda");

  function getGategoryList() {
    return axios.get(` https://dummyjson.com/products/category/${slug} `);
  }

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
      <div className="mt-22 container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="relative mb-10">
            <div className="flex justify-between items-center">
              <h1 className="text-[#076b5e] font-bold text-2xl sm:text-3xl capitalize">
                {slug}
              </h1>

              <Link to="/category">
                <div className="text-2xl sm:text-3xl bg-[#076b5e]/20 p-2 rounded-full cursor-pointer hover:bg-[#076b5e]/30 transition">
                  <span className="text-[#017d6d] hover:text-red-500 duration-200 ease-in">
                    <IoIosReturnLeft />
                  </span>
                </div>
              </Link>
            </div>

            <div className="absolute bg-[#076b5e] w-24 sm:w-32 h-0.5 top-10 sm:top-12"></div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {data.data.products.map((categoryList) => (
              <Link
                to={`/productDetails/${categoryList.id}`}
                key={categoryList.id}
              >
                <div
                  className="
            bg-white
            shadow-sm
            hover:shadow-md
            transition
            duration-300
            border
            border-[#066356]/30
            rounded-2xl
            overflow-hidden
            flex
            flex-col
            h-full
            group
          "
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={categoryList.thumbnail}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />

                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
                      {categoryList.discountPercentage}% OFF
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 flex flex-col grow justify-between">
                    <div>
                      <h2 className="font-semibold text-sm sm:text-base line-clamp-2 min-h-10">
                        {categoryList.title}
                      </h2>

                      <div className="flex justify-between items-center mt-2">
                        <p className="text-gray-600 font-semibold text-sm sm:text-base">
                          ${categoryList.price}
                        </p>

                        <div className="flex items-center gap-3 text-gray-400">
                          <div
                            onClick={() => addToWashlist(categoryList)}
                            className="cursor-pointer hover:text-red-500 transition"
                          >
                            <FaHeart />
                          </div>

                          <div
                            onClick={() => addToCart(categoryList)}
                            className="cursor-pointer hover:text-green-600 transition"
                          >
                            <FaCartShopping />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <Link to={`/productDetails/${categoryList.id}`}>
                      <button
                        className="
                  mt-4
                  bg-[#076b5e]
                  hover:bg-[#045c50]
                  w-full
                  text-sm
                  font-medium
                  text-white
                  py-2
                  rounded-lg
                  transition
                  cursor-pointer
                "
                      >
                        More details
                      </button>
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
