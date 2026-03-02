import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
import { authContext } from "../Context/AuthContext";

import Lottie from "lottie-react";
import signin from "../../assets/signin/Login.json";

const schema = zod.object({
  email: zod.email(),

  password: zod
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      " Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    ),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(authContext);

  const navigate = useNavigate();

  const { handleSubmit, register, formState } = useForm({
    // opitnioal
    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onBlur",

    resolver: zodResolver(schema),
  });

  function myHandleSubmit(data) {
    console.log("submit", data);

    setIsLoading(true);

    const userSave = JSON.parse(localStorage.getItem("userRegister"));

    if (!userSave) {
      toast.error("No account found, please register first", {
        position: "top-right",
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return;
    }

    if (userSave.email === data.email && userSave.password === data.password) {
      login("loggedIn");
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 1500,
      });

      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1500);
    } else {
      toast.error(" Invalid email or password ", {
        position: "top-right",
        autoClose: 1500,
      });

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center container mx-auto px-13 py-8">
      {/* ================= Form Section ================= */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md shadow-[#004f44]/30 p-6 sm:p-8 border border-[#004f44]">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-orange-500 mb-6">
            Login to Your Account
          </h1>

          <form onSubmit={handleSubmit(myHandleSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#00ad96]">
                Email:
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="name@example.com"
                className="w-full cursor-pointer border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#00ad96]">
                Password:
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="w-full cursor-pointer border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className={`w-full py-2.5 rounded-lg text-white font-medium transition ${
                isLoading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
              }`}
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <ColorRing width={35} height={35} />
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Go to Register */}
          <p className="text-center text-sm mt-4">
            Don’t have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-orange-500 cursor-pointer ml-1 font-medium hover:underline"
            >
              Register Now
            </span>
          </p>
        </div>
      </div>

      {/* ================= Animation Section ================= */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Lottie
          animationData={signin}
          loop={true}
          style={{ width: "100%", maxWidth: 550 }}
        />
      </div>
    </div>
  );

}
