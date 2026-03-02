import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function CategorySlider() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["GetallCategory"],
    queryFn: getAllCategory,
    refetchOnMount: false,
    retry: 2,
  });

  function getAllCategory() {
    return axios.get("https://dummyjson.com/products/categories");
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
      <section>
        <div className=" container mx-auto p-5  mt-16 ">
          <h2 className="text-3xl font-bold mb-12 text-[#076b5e] relative ">
            Shop by Category
            <div className="absolute bg-[#076b5e] dark:bg-amber-400 w-61 h-0.5 top-12 "></div>
          </h2>

          <div className="py-4 ">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={2}
              navigation
              autoplay={{ delay: 2500 }}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
            >
              {data?.data.map((category) => (
                <SwiperSlide
                  key={category?.slug}
                  onClick={() => navigate(`/category/${category.slug}`)}
                >
                  <div className="text-[#024f46] bg-white border border-[#004f44]  dark:border-orange-500 rounded-2xl py-2 text-center cursor-pointer ">
                    <p className="text-sm font-semibold capitalize whitespace-nowrap overflow-hidden  ">
                      {category.name}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
