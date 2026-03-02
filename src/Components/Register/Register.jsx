import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";

import Lottie from "lottie-react";
import signupAnimation from "../../assets/signup/Sign-up.json";

const schema = zod
  .object({
    name: zod
      .string(" Name must be string ")
      .nonempty(" Name is required ")
      .min(3, " ZOD: Min 3 ")
      .max(15, " ZOD: Max 15 "),

    email: zod.email(),

    password: zod
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        " Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      ),

    rePassword: zod
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        " Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      ),

    dateOfBirth: zod.coerce
      .date("Invalid date")
      .refine(function (value) {
        return new Date().getFullYear() - value.getFullYear() >= 18
          ? true
          : false;
      }, " Age must be 18 or above ")
      .transform(function (dateObj) {
        return ` ${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()} `;
      }),

    // gender: zod.string().regex(/( male | female )/)
    gender: zod.enum(["male", "female"], " Gender invalid"),
  })
  .refine(function (value) {
    if (value.password !== value.rePassword) {
      return false;
    }

    return true;
  }, " Passwords are incompatible ");

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { handleSubmit, register, formState } = useForm({
    // opitnioal
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },

    mode: "onBlur",

    resolver: zodResolver(schema),
  });

  console.log(formState.errors, "formState");

  function myHandleSubmit(data) {
    console.log("submit", data);

    const existingUser = JSON.parse(localStorage.getItem("userRegister"));

    if (existingUser?.email === data.email) {
      // alert("Email already exists");
      toast.error("Email already exists", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    localStorage.setItem("userRegister", JSON.stringify(data));

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 2000);

    toast.success("Account created successfully", {
      position: "top-right",
      autoClose: 1500,
      onClose: () => navigate("/login"),
    });
  }

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center container mx-auto px-13 py-8 mt-16 md:mt-12">
      {/* ================= Form Section ================= */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md shadow-[#004f44]/30 p-6 sm:p-8 border border-[#004f44]">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-orange-500 mb-6">
            Create Account
          </h1>

          <form onSubmit={handleSubmit(myHandleSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#00ad96]">
                Username:
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full cursor-pointer  border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your name"
              />
              {formState.errors.name && (
                <p className="text-red-500 text-sm">
                  {formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#00ad96]">
                Email:
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full border cursor-pointer rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="name@gmail.com"
              />
              {formState.errors.email && (
                <p className="text-red-500 text-sm">
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
                className="w-full border cursor-pointer rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#00ad96]">
                Confirm Password:
              </label>
              <input
                {...register("rePassword")}
                type="password"
                className="w-full cursor-pointer border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {formState.errors.rePassword && (
                <p className="text-red-500 text-sm">
                  {formState.errors.rePassword.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#00ad96]">
                Date of Birth:
              </label>
              <input
                {...register("dateOfBirth")}
                type="date"
                className="w-full cursor-pointer border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {formState.errors.dateOfBirth && (
                <p className="text-red-500 text-sm">
                  {formState.errors.dateOfBirth.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#00ad96]">
                Gender:
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-[#00ad96]">
                  <input
                    {...register("gender")}
                    type="radio"
                    value="male"
                    className="cursor-pointer"
                  />
                  Male
                </label>
                <label className="flex items-center gap-2 text-[#00ad96]">
                  <input
                    {...register("gender")}
                    type="radio"
                    value="female"
                    className="cursor-pointer"
                  />
                  Female
                </label>
              </div>
              {formState.errors.gender && (
                <p className="text-red-500 text-sm">
                  {formState.errors.gender.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className={`w-full py-2.5 rounded-lg cursor-pointer text-white font-medium transition ${isLoading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <ColorRing width={35} height={35} />
                </div>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-orange-500 cursor-pointer ml-1 font-medium"
            >
              Login
            </span>
          </p>
        </div>
      </div>

      {/* ================= Animation Section ================= */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Lottie
          animationData={signupAnimation}
          loop={true}
          style={{ width: "100%", maxWidth: 550 }}
        />
      </div>
    </div>
  );
}
