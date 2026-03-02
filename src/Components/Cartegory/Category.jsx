import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/Images/img1.webp";
import img2 from "../../assets/Images/img2.webp";
import img3 from "../../assets/Images/img3.webp";
import img4 from "../../assets/Images/img4.webp";
import img5 from "../../assets/Images/img5.webp";
import img6 from "../../assets/Images/img6.webp";
import img7 from "../../assets/Images/img7.webp";
import img8 from "../../assets/Images/img8.webp";
import img9 from "../../assets/Images/img9.webp";
import img10 from "../../assets/Images/img10.webp";
import img11 from "../../assets/Images/img11.webp";
import img12 from "../../assets/Images/img12.webp";
import img13 from "../../assets/Images/img13.webp";
import img14 from "../../assets/Images/img14.webp";
import img15 from "../../assets/Images/img15.webp";
import img16 from "../../assets/Images/img16.webp";
import img17 from "../../assets/Images/img17.webp";
import img18 from "../../assets/Images/img18.webp";
import img19 from "../../assets/Images/img19.webp";
import img20 from "../../assets/Images/img20.webp";
import img21 from "../../assets/Images/img21.webp";
import img22 from "../../assets/Images/img22.webp";
import img23 from "../../assets/Images/img23.webp";
import img24 from "../../assets/Images/img24.webp";
import Loader from "../Loader/Loader";

export default function Category() {
  const navigate = useNavigate();

  // الصور بالترتيب
  const categoryImages = [
    img1, img2, img3, img4, img5, img6,
    img7, img8, img9, img10, img11, img12,
    img13, img14, img15, img16, img17, img18,
    img19, img20, img21, img22, img23, img24,
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["GetallCategoryPage"],
    queryFn: getAllCategoryPage,
    refetchOnMount: false ,
    retry: 2 ,
  });

  function getAllCategoryPage() {
    return axios.get("https://dummyjson.com/products/categories");
  }

  if (isLoading) {
    return <Loader/>
    
    
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
        <div className="container mx-auto p-5 mt-16">
          {/* Title */}
          <h2 className="text-3xl font-bold mb-10 text-[#076b5e] relative">
            Shop by Category
            <div className="absolute bg-[#076b5e] dark:bg-orange-500 w-40 h-0.5 top-12"></div>
          </h2>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.data.map((category, index) => (
              <div
                key={index}
                onClick={() => navigate(`/category/${category.slug}`)}
                className="
                  cursor-pointer
                   dark:bg-[#1f2937]
                  border border-[#004f44] dark:border-orange-500
                  rounded-2xl
                  p-6
                  text-center
                  shadow-sm
                  hover:shadow-md
                  hover:shadow-[#004f44]/60
                  transition duration-300
                  group
                  
                "
              >
                {/* Image */}
                <div
                  className="
                    mb-6
                    h-56
                    overflow-hidden
                    bg-[#004f44]/10
                    dark:bg-orange-500/20
                    flex items-center justify-center

                  "
                >
                  <img
                    src={categoryImages[index]}
                    alt={category.name}
                    className="w-full h-full object-center
                    group-hover:scale-105
                    transition
                    duration-300
                    ease-in"
                  />
                </div>

                {/* Category Name */}
                <p
                  className="
                    font-semibold capitalize
                    text-[#024f46]
                    dark:text-orange-400
                    text-sm
                  "
                >
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}