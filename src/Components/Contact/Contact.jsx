import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email"),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = () => {
    toast.success("Message sent successfully", {
      position: "top-right",
      autoClose: 1500,
    });
    reset();
  };

  return (
    <>
      <section className="mt-30 bg-white">
        <div className="container md:px-10 mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-dem text-[#318160] mb-4">
              Contact Us
            </h1>
            <p className="text-black/80 text-center max-w-2xl  mx-auto">
              We welcome your inquiries and suggestions.
            </p>
          </div>

          <div className=" flex justify-center items-center ">
            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-gray-50 p-8 md:p-10 rounded-3xl shadow-sm space-y-6 w-full max-w-xl"
            >
              {/* Name */}
              <div>
                <label className="block mb-1 text-sm font-medium">Name</label>
                <input
                  {...register("name")}
                  placeholder=" Full Name "
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition
                focus:ring-2 focus:ring-[#318160]/40
                ${errors.name ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  {...register("email")}
                  placeholder="example@email.com"
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition
                focus:ring-2 focus:ring-[#318160]/40
                ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className={`w-full rounded-xl border px-4 py-3 outline-none resize-none transition
                focus:ring-2 focus:ring-[#318160]/40
                ${errors.message ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#318160] text-white py-3 rounded-xl font-semibold
              hover:bg-[#276a52] transition disabled:opacity-70 cursor-pointer"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
